import { CustomAPIError } from "./custom-error.js";
import statusCode from 'http-status-codes';
export class NotFoundError extends CustomAPIError {
    constructor(message){
        super(message);
        this.statusCode = statusCode.NOT_FOUND;
    }
}