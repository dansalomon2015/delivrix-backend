import { User } from "@prisma/client";
import { UserModel } from "../models";

export class UserMapper {
    public static mapToUserModel(user: User): UserModel {
        return {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            active: user.active,
            createdAt: user.createdAt,
            createdBy: user.createdBy,
            lastLogin: user.lastLogin,
            lastName: user.lastName,
            updatedAt: user.updatedAt,
            imageUrl: user.imageUrl,
            token: user.token,
            privileges: user.privileges,
            tokenExpiryDate: user.tokenExpiryDate,
        };
    }
}
