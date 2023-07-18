import { MerchantModel } from "./Merchant";

export interface RetailerModel {
    id: number;
    email: string;
    phone: string;
    zone: string;
    acronym: string;
    validated: boolean;
    active: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    merchant?: MerchantModel;
}
