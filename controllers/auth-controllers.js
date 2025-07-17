import User from '../models/user-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';

const cookieOptions = {
    httpOnly: true,
    path: '/',
    maxAge: 3600000, // Only for setting, not for clearing
    secure: process.env.NODE_ENV === 'production', // true for production (HTTPS), false for local dev (HTTP)
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'None' requires secure: true
};

export const loginUser = asyncWrapper(async(req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password)
        return res.status(400).json({msg: "Vui lòng nhập đủ username và password"});
    const user = await User.findOne({username: username});
    if(user){
        if(!await user.checkPassword(password))
            return res.status(401).json({msg: "Tài khoản hoặc mật khẩu không chính xác"});
        
        const token = user.createJWT();

        await res.cookie('access_token', token, {...cookieOptions});

        return res.status(200).json({id: user._id, username, name: user.name, role: user.role});
    }
    return res.status(401).json({msg: "Tài khoản hoặc mật khẩu không chính xác"});
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
    res.status(200).json({ msg: 'Đăng xuất thành công' });
});

export const registerUser = asyncWrapper(async(req, res, next) => {
    const {username, password, name} = req.body;
    const existUser = await User.findOne({username});
    if(existUser){
        return res.status(400).json({msg: 'Tên người dùng đã tồn tại'});
    }

    const user = await User.create({username, password, role: 'customer', name});
    if(user)
    {
        return res.status(201).json({msg: "Tạo user thành công"});
    }
    return res.status(500).json({msg: 'Tạo user thất bại'});
})

export const getUserInfo = asyncWrapper(async(req, res, next) => {
    const {userId, role} = req.user;
    if(!userId)
        return res.status(400).json({msg: "Không tìm thấy id người dùng"});
    const user = await User.findOne({_id: userId}).select('-password');
    console.log(user);
    if(user)
        return res.status(200).json({id: user._id, username: user.username, name: user.name, role: user.role});
    return res.status(404).json({msg: "Không tìm thấy người dùng này"});
})
