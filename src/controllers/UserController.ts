import { NextFunction, Request, Response } from "express";
import {
    ApiResponse,
    CreateUserRequestModel,
    UpdateUserRequestModel,
    UserModel,
    loginUserSchema,
    registerUserSchema,
} from "../models";
import { UserRepository } from "../repositories/UserRepository";
import { ApiResponseCodeType, HTTP_RESPONSE_CODES } from "../types";
import { UserMapper } from "../mappers";
import { DATA_VALIDATION_OPTIONS } from "../utils";
import { DataValidationError } from "../utils/DataValidationError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../service";

export class UserController {
    private userRepository: UserRepository;
    private userService: UserService;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.userService = new UserService(userRepository);
    }

    public saveUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = registerUserSchema.validateSync(
                req.body,
                DATA_VALIDATION_OPTIONS
            ) as unknown as CreateUserRequestModel;

            this.userService
                .createUser(userData)
                .then((data) => {
                    let response = new ApiResponse<UserModel, any>(
                        "Successful Operation",
                        "Success",
                        ApiResponseCodeType.SUCCESS
                    );
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
            const { email, password } = loginUserSchema.validateSync(req.body, DATA_VALIDATION_OPTIONS);

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

                        return this.userService
                            .updateUserToken(email, token)
                            .then(() => {
                                // user
                                let response = new ApiResponse<UserModel, any>(
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
        this.userService
            .getAllUsers()
            .then((users) => {
                let response = new ApiResponse("Successful Operation", "Success", ApiResponseCodeType.SUCCESS);
                response.setData(users);
                return res.status(HTTP_RESPONSE_CODES.OK).json(response);
            })
            .catch(next);
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        const { id } = req.body as { id: number };
        this.userService
            .getFullUserDetails(id)
            .then((user) => {
                let response = new ApiResponse("Successful Operation", "Success", ApiResponseCodeType.SUCCESS);
                response.setData(user);
                return res.status(HTTP_RESPONSE_CODES.OK).json(response);
            })
            .catch(next);
    }

    public update(req: Request, res: Response, next: NextFunction) {
        const userData = req.body as UpdateUserRequestModel;
    }
}
