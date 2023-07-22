import { NextFunction, Request, Response } from "express";
import { ApiResponse, CreateUserRequestModel } from "../models";
import { UserRepository } from "../repositories/UserRepository";
import { ApiResponseCodeType, HTTP_RESPONSE_CODES } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserMapper } from "../mappers";

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public saveUser(req: Request, res: Response, next: NextFunction) {
        const userData = req.body as CreateUserRequestModel;
        this.userRepository
            .save(userData)
            .then((data) => {
                let response = new ApiResponse("Successful Operation", "Success", ApiResponseCodeType.SUCCESS);
                response.setData(data);
                res.status(HTTP_RESPONSE_CODES.OK).json(response);
            })
            .catch(next);
    }

    public login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        this.userRepository.findByEmailWithMerchantAndRetailer(email).then(async (user) => {
            try {
                if (user && (await bcrypt.compare(password, password))) {
                    // Create token
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        process.env.JWT_SECRET_KEY as jwt.Secret,
                        { expiresIn: "2h" }
                    );

                    // save user token
                    user.token = token;
                    await this.userRepository.updateToken(email, token);

                    // user
                    res.status(200).json(UserMapper.mapToUserModel(user));
                }
                next(new ApiResponse("Invalid Credentials", "fail", HTTP_RESPONSE_CODES.BAD_REQUEST));
            } catch (error) {
                next(error);
            }
        });
    }
}
