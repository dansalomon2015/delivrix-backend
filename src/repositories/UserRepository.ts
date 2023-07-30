import { User } from "@prisma/client";
import { CreateUserRequestModel, UserModel } from "../models";
import { UserMapper } from "../mappers";
import bcrypt from "bcryptjs";
import { BCRYPT_SALT } from "../utils";
import { Repository } from "./Repository";

export class UserRepository extends Repository {
    constructor() {
        super();
    }

    async findAll(): Promise<UserModel[]> {
        const users: User[] = await this.prisma.user.findMany();
        return users.map((user) => UserMapper.mapToUserModel(user));
    }

    async findById(id: number): Promise<UserModel | null> {
        const user: User | null = await this.prisma.user.findUnique({ where: { id } });
        return user ? UserMapper.mapToUserModel(user) : null;
    }

    async findByIdWithMerchantAndRetailer(id: number): Promise<UserModel | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { id },
            include: {
                merchant: {
                    select: {
                        id: true,
                        active: true,
                        name: true,
                        validated: true,
                        email: true,
                        phone: true,
                        acronym: true,
                    },
                },
                retailer: {
                    select: {
                        id: true,
                        active: true,
                        validated: true,
                        email: true,
                        phone: true,
                        acronym: true,
                        zone: true,
                    },
                },
            },
        });
        return user ? UserMapper.mapToUserModel(user) : null;
    }

    async findByEmailWithMerchantAndRetailer(email: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { email },
            include: {
                merchant: {
                    select: {
                        id: true,
                        active: true,
                        name: true,
                        validated: true,
                        email: true,
                        phone: true,
                        acronym: true,
                    },
                },
                retailer: {
                    select: {
                        id: true,
                        active: true,
                        validated: true,
                        email: true,
                        phone: true,
                        acronym: true,
                        zone: true,
                    },
                },
            },
        });
        return user ? user : null;
    }

    async save(userData: CreateUserRequestModel): Promise<UserModel> {
        let hashPassword = bcrypt.hashSync(userData.password, BCRYPT_SALT);
        const user: User = await this.prisma.user.create({
            data: {
                ...userData,
                password: hashPassword,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return UserMapper.mapToUserModel(user);
    }

    async updateToken(email: string, token: string, tokenExpiryDate: Date) {
        await this.prisma.user.update({
            where: {
                email,
            },
            data: {
                token,
                tokenExpiryDate,
            },
        });
    }

    async deleteById(id: number): Promise<UserModel | null> {
        const user: User | null = await this.prisma.user.delete({ where: { id } });
        return user ? UserMapper.mapToUserModel(user) : null;
    }
}
