import { PrismaClient, User } from "@prisma/client";
import { CreateUserRequestModel, UserModel } from "../models";
import { UserMapper } from "../mappers";

export class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
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

    async save(userData: CreateUserRequestModel): Promise<UserModel> {
        const user: User = await this.prisma.user.create({
            data: {
                ...userData,
                active: true,
                lastLogin: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return UserMapper.mapToUserModel(user);
    }

    async deleteById(id: number): Promise<UserModel | null> {
        const user: User | null = await this.prisma.user.delete({ where: { id } });
        return user ? UserMapper.mapToUserModel(user) : null;
    }
}
