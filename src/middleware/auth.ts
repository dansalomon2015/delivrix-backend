import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse, CustomRequest, JwtAccessDecoded } from "../models";
import { HTTP_RESPONSE_CODES } from "../types";

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const bearer = req.headers["authorization"];
    let token: string | undefined | null = null;

    try {
        token = bearer?.split(" ")[1];
    } catch (e) {
        console.log(e);
    }

    if (!token) {
        next(new ApiResponse("Authentication required", "fail", HTTP_RESPONSE_CODES.FORBIDDEN));
    }
    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET_KEY as jwt.Secret);
        req.user = decoded as JwtAccessDecoded;
    } catch (err) {
        next(new ApiResponse("Authentication failed", "fail", HTTP_RESPONSE_CODES.UNAUTHORIZED));
    }
    return next();
};

module.exports = verifyToken;
