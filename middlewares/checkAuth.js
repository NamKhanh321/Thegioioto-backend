import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

export const checkAuth = async(req, res, next) => {
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
};