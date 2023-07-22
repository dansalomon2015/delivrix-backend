import { Prisma } from "@prisma/client";
import { ApiResponse } from "../models";
import { HTTP_RESPONSE_CODES } from "../types";

export class ErrorHandler {
    public static process(error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return new ApiResponse(`Email already used`, "fail", HTTP_RESPONSE_CODES.REQUEST_CONFLICT);
            }
        } else {
            return error;
        }
    }
}
