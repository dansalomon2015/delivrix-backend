import { MerchantModel } from "./Merchant";
import { RetailerModel } from "./Retailer";

export interface UserModel {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl?: string | null;
    privileges: String[];
    merchant?: MerchantModel;
    retailer?: RetailerModel;
    lastLogin: Date | null;
    active: boolean;
    createdBy: string;
    token: string | null;
    createdAt: Date;
    updatedAt: Date;
    tokenExpiryDate: Date | null;
}
