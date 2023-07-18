export interface MerchantModel {
    id: number;
    email: string;
    name: string;
    phone: string;
    acronym: string;
    validated: boolean;
    active: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
