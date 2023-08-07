import { NextFunction, Request, Response } from "express";
import { ApiResponse, UserModel } from "../models";
import { UserRepository } from "../repositories";
import { HTTP_RESPONSE_CODES, PrivilegeType } from "../types";

export const accessPrivilege = (privileges: PrivilegeType[]) => {
    const userRepository = new UserRepository();
    return async (req: Request, res: Response, next: NextFunction) => {
        let loggedUser = await userRepository.findById(req.user?.id!);
        let hasAccess = false;

        privileges.forEach((privilege) => {
            if (loggedUser?.privileges.includes(privilege)) {
                hasAccess = true;
            }
        });

        if (!hasAccess) {
            return next(
                new ApiResponse("Not authorized to access this resource", "fail", HTTP_RESPONSE_CODES.UNAUTHORIZED)
            );
        }

        next();
    };
};
