import statusCode from 'http-status-codes';

export const notFound = (req,res) => res.status(statusCode.NOT_FOUND).send('Route không tồn tại!');