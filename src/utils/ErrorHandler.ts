import { Prisma } from "@prisma/client";
import { ApiResponse } from "../models";
import { HTTP_RESPONSE_CODES } from "../types";
import { DataValidationError } from "./DataValidationError";

export class ErrorHandler {
    public static process(error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return new ApiResponse(`Email already used`, "fail", HTTP_RESPONSE_CODES.REQUEST_CONFLICT);
            }
        } else {
            if (error instanceof DataValidationError) {
                let resp = new ApiResponse("Invalid data", "fail", HTTP_RESPONSE_CODES.UNPROCESSABLE_ENTITY);
                resp.setErrors(error.errors);
                return resp;
            } else {
                return error;
            }
        }
    }
}
