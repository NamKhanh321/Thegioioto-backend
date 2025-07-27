import User from '../models/user-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, UnauthenticatedError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

// const cookieOptions = {
//     httpOnly: true,
//     path: '/',
//     maxAge: 3600000, // Only for setting, not for clearing
//     secure: process.env.NODE_ENV === 'production', // true for production (HTTPS), false for local dev (HTTP)
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'None' requires secure: true
// };

export const loginUser = asyncWrapper(async(req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password)
        throw new BadRequestError('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
    const user = await User.findOne({username: username});
    if(!user)
        throw new UnauthenticatedError('Tài khoản hoặc mật khẩu không chính xác');
    const isMatched = await user.checkPassword(password);
    if(!isMatched)
        throw new UnauthenticatedError('Tài khoản hoặc mật khẩu không chính xác');
    const token = user.createJWT();
    // await res.cookie('access_token', token, {...cookieOptions});
    return res.status(StatusCodes.OK).json({id: user._id, username, name: user.name, role: user.role, accessToken: token});
})

export const logoutUser = asyncWrapper(async (req, res) => {
    await res.clearCookie('access_token', {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    path: cookieOptions.path,
    sameSite: cookieOptions.sameSite,
    });

//   invalidateJwtToken(req.cookies.access_token); // Implement this function if needed

  // 3. Send a success response
    res.status(StatusCodes.OK).json({ msg: 'Đăng xuất thành công' });
});

export const registerUser = asyncWrapper(async(req, res, next) => {
    const {username, password, name} = req.body;
    const existUser = await User.findOne({username});
    if(existUser){
        throw new BadRequestError('Tên người dùng đã tồn tại');
    }

    const user = await User.create({username, password, role: 'customer', name});
    if(!user)
        throw new BadRequestError('Tạo user thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo user thành công"});
})

export const getUserInfo = asyncWrapper(async(req, res, next) => {
    const {userId} = req.user;
    if(!userId)
        throw new BadRequestError('Không tìm thấy id người dùng');
    const user = await User.findOne({_id: userId}).select('-password');
    if(!user)
        throw new NotFoundError('Không tìm thấy người dùng này');
    return res.status(200).json({id: user._id, username: user.username, name: user.name, role: user.role});
})
