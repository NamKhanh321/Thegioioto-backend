import User from '../models/user-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, UnauthenticatedError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const getAllUsers = asyncWrapper(async (req,res,next) => {
    const users = await User.find({}).select('-password');
    return res.status(StatusCodes.OK).json(users);
})

export const getUsersById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.find({_id: id}).select('-password');
    if(!user)
        throw new NotFoundError('Không tìm thấy người dùng này');
    return res.status(StatusCodes.OK).json(user);  
})

export const createUsers = asyncWrapper(async (req,res,next) => {
    const {username, password, role, name} = req.body;
    const existUser = await User.findOne({username});
    if(existUser){
        throw new BadRequestError('Tên người dùng đã tồn tại');
    }

    const user = await User.create({username, password, role, name});
    if(!user)
        throw new BadRequestError('Tạo user thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo user thành công"});
} )

export const updateUsers = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    // const user = await User.findOneAndUpdate({_id: id}, {password, name, role});
    if(!user)
        throw new NotFoundError('Không tìm thấy người dùng này');
    const {password, name, role} = req.body;
    if(password)
    {
        user.password = password;
    }
    user.name = name || user.name;
    user.role = role || user.role;
    const updatedUser = await user.save();
    res.status(StatusCodes.OK).json(updatedUser);
})

export const deleteUsers = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id});
    if(!user)
        throw new NotFoundError('Không tìm thấy người dùng này');
    if(user.role === 'admin')
    {
        const adminCount = User.countDocuments({role: 'admin'});
        if(adminCount <= 1)
            throw new BadRequestError('không thể xóa admin cuối cùng trong hệ thống');
    }
    await user.deleteOne();
    res.status(StatusCodes.OK).json('Xóa người dùng thành công!');
})