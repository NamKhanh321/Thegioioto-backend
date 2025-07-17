import { CustomAPIError } from "./custom-error.js";
import statusCode from 'http-status-codes';
export class BadRequestError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCode = statusCode.BAD_REQUEST;
    }
}