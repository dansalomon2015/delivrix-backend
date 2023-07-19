import { NextFunction, Request, Response } from "express";
import { ApiResponse, CreateUserRequestModel } from "../models";
import { UserRepository } from "../repositories/UserRepository";
import { ApiResponseCodeType } from "../types";

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public saveUser(req: Request, res: Response, next: NextFunction) {
        const userData = req.body as CreateUserRequestModel;
        // res.status(200).send(userData);
        this.userRepository
            .save(userData)
            .then((data) => {
                let response = new ApiResponse("Success", "Success", ApiResponseCodeType.SUCCESS);
                response.setData(data);
                res.status(200).json(response);
            })
            .catch(next);
    }
}
