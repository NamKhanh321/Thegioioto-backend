import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';
import asyncWrapper from './asyncWrapper.js';

export const checkAuth = asyncWrapper(async(req, res, next) => {
    const token = req.cookies.access_token;
    if(!token)
        {
            throw new UnauthenticatedError('Không tìm thấy token');
        }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userId, role} = decoded;
        req.user = {userId, role};
        next();
    }
    catch(err) {
        throw new UnauthenticatedError('Token không hợp lệ');
    }
});

export const checkAdmin = asyncWrapper(async(req,res,next) => {
    const {role} = req.user;
    if(role !== 'admin')
        throw new UnauthenticatedError('Bạn không có quyền truy cập route này!');
    next();
})

export const checkStaff = asyncWrapper(async(req,res,next) => {
    const {role} = req.user;
    if(role !== 'staff' && role !== 'admin')
        throw new UnauthenticatedError('Bạn không có quyền truy cập route này!');
    next();
})