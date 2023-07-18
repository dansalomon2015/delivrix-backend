import { Request, Response } from "express";
import { CreateUserRequestModel } from "../models";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public saveUser(req: Request, res: Response) {
        const userData = req.body as CreateUserRequestModel;
        // res.status(200).send(userData);
        this.userRepository
            .save(userData)
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).send(error));
    }
}
