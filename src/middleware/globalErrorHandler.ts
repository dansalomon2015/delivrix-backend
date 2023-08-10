import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils";
import { ApiResponseCodeType } from "../types";

export const globalErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    try {
        error = ErrorHandler.process(error);
        error.statusCode = error.statusCode || 500;
        error.status = error.status || "error";
        let data = {
            status: ApiResponseCodeType.ERROR,
            message: error.message,
        };
        if (Object.prototype.hasOwnProperty.call(error, "errors")) {
            res.status(error.statusCode).json({ ...data, errors: error.errors });
        } else {
            res.status(error.statusCode).json(data);
        }
    } catch (error) {
        res.status(500).json({ status: error, message: "Internal server error" });
    }
};
