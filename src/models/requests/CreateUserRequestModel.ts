import { Privilege } from "@prisma/client";

export interface CreateUserRequestModel {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    privileges: Privilege[];
    merchantId: number | null;
    retailerId: number | null;
    imageUrl: string | null;
    createdBy: string;
}
