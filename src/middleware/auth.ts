import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse, JwtAccessDecoded } from "../models";
import { HTTP_RESPONSE_CODES } from "../types";
import { UserRepository } from "../repositories";
import { DB_TOKEN_EXPIRY_PERIOD_IN_HOUR } from "../utils";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers["authorization"];
    let token: string | undefined | null = null;
    const userRepository = new UserRepository();

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
        const loggedUser = await userRepository.findById(req.user.id);

        let anotherTokenHasBeenGen = !(token === loggedUser?.token);
        let tokenExpired = new Date().getTime() >= new Date(loggedUser?.tokenExpiryDate!).getTime();
        if (anotherTokenHasBeenGen || tokenExpired) {
            return next(new ApiResponse("Token expired", "fail", HTTP_RESPONSE_CODES.FORBIDDEN));
        }

        //Extend token life
        await userRepository.updateToken(
            loggedUser?.email!,
            loggedUser?.token!,
            new Date(new Date().getTime() + DB_TOKEN_EXPIRY_PERIOD_IN_HOUR * 60 * 60 * 1000)
        );
    } catch (error) {
        let resp = new ApiResponse("Authentication failed", "fail", HTTP_RESPONSE_CODES.UNAUTHORIZED);
        resp.setErrors(error);
        next(error);
    }
    next();
};
