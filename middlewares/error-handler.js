import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError)
    {
        console.log(err);
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Có lỗi xảy ra, vui lòng thử lại sau"});
}