import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from 'mongoose';

export const errorHandlerMiddleware = (err, req, res, next) => {
    // if(err instanceof CustomAPIError)
    // {
    //     return res.status(err.statusCode).json({msg: err.message});
    // }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Có lỗi xảy ra, vui lòng thử lại sau"});
    
    // Default error object
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Có lỗi xảy ra, vui lòng thử lại sau",
    };

    // Check for Mongoose Validation Error
    if (err instanceof mongoose.Error.ValidationError) {
        customError.msg = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400 Bad Request
    }

    // Check for Mongoose Cast Error (e.g., invalid ID format)
    if (err instanceof mongoose.Error.CastError) {
        customError.msg = `Không tìm thấy tài nguyên với ID: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND; // 404 Not Found
    }

    // Check for Duplicate Key Error (MongoDB E11000)
    if (err.code && err.code === 11000) {
        customError.msg = `Giá trị đã nhập cho trường ${Object.keys(err.keyValue)} đã tồn tại. Vui lòng chọn giá trị khác.`;
        customError.statusCode = StatusCodes.BAD_REQUEST; // 400 Bad Request
    }

    // Handle your custom API errors
    if (err instanceof CustomAPIError) {
        customError.msg = err.message;
        customError.statusCode = err.statusCode;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
}