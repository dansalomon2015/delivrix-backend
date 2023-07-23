import { NextFunction, Request, Response } from "express";
import { ApiResponse, CreateUserRequestModel, loginUserSchema, registerUserSchema } from "../models";
import { UserRepository } from "../repositories/UserRepository";
import { ApiResponseCodeType, HTTP_RESPONSE_CODES } from "../types";
import { UserMapper } from "../mappers";
import { DB_TOKEN_EXPIRY_PERIOD_IN_HOUR } from "../utils";
import { DataValidationError } from "../utils/DataValidationError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public saveUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = registerUserSchema.validateSync(req.body, {
                abortEarly: false,
                stripUnknown: true,
            }) as unknown as CreateUserRequestModel;

            this.userRepository
                .save(userData)
                .then((data) => {
                    let response = new ApiResponse("Successful Operation", "Success", ApiResponseCodeType.SUCCESS);
                    response.setData(data);
                    res.status(HTTP_RESPONSE_CODES.OK).json(response);
                })
                .catch(next);
        } catch (error: any) {
            next(new DataValidationError(error.errors));
        }
    }

    public login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = loginUserSchema.validateSync(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            this.userRepository.findByEmailWithMerchantAndRetailer(email).then(async (user) => {
                try {
                    if (user && (await bcrypt.compare(password, user.password))) {
                        // Create token
                        const token = jwt.sign(
                            { id: user.id, email: user.email },
                            process.env.JWT_SECRET_KEY as jwt.Secret,
                            { expiresIn: 60 * 60 * 24 * 30 }
                        );

                        // save user token
                        user.token = token;

                        return this.userRepository
                            .updateToken(
                                email,
                                token,
                                new Date(new Date().getTime() + DB_TOKEN_EXPIRY_PERIOD_IN_HOUR * 60 * 60 * 1000)
                            )
                            .then(() => {
                                // user
                                let response = new ApiResponse(
                                    "Successfully logged in",
                                    "Success",
                                    ApiResponseCodeType.SUCCESS
                                );
                                response.setData(UserMapper.mapToUserModel(user));
                                return res.status(HTTP_RESPONSE_CODES.OK).json(response);
                            })
                            .catch(next);
                    }
                    next(new ApiResponse("Invalid Credentials", "fail", HTTP_RESPONSE_CODES.BAD_REQUEST));
                } catch (error) {
                    next(error);
                }
            });
        } catch (error: any) {
            next(new DataValidationError(error.errors));
        }
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        this.userRepository
            .findAll()
            .then((users) => {
                let response = new ApiResponse("Successful Operation", "Success", ApiResponseCodeType.SUCCESS);
                response.setData(users);
                return res.status(HTTP_RESPONSE_CODES.OK).json(response);
            })
            .catch(next);
    }
}
