import { CreateUserRequestModel } from "../models";
import { UserRepository } from "../repositories";
import { DB_TOKEN_EXPIRY_PERIOD_IN_HOUR } from "../utils";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(userData: CreateUserRequestModel) {
        return this.userRepository.save(userData);
    }

    async updateUserToken(email: string, token: string) {
        return this.userRepository.updateToken(
            email,
            token,
            new Date(new Date().getTime() + DB_TOKEN_EXPIRY_PERIOD_IN_HOUR * 60 * 60 * 1000)
        );
    }

    async getAllUsers() {
        return this.userRepository.findAll();
    }

    async getFullUserDetails(id: number) {
        return this.userRepository.findByIdWithMerchantAndRetailer(id);
    }
}
