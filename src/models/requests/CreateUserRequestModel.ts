import { PrivilegeType } from "../../types";

export interface CreateUserRequestModel {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    privileges: PrivilegeType[];
    merchantId: number | null;
    retailerId: number | null;
    imageUrl: string | null;
    createdBy: string;
}
