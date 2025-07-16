import jwt from 'jsonwebtoken';

export const checkAuth = async(req, res, next) => {
    const token = req.cookies.access_token;
    if(!token)
        return res.status(401).json({msg: "Không tìm thấy access token!"});
    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if(err)
            return res.status(403).json({msg: "Token không hợp lệ"});
        req.user = {
            id: userId,
        }
        next();
    })
};