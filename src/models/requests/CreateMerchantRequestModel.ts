export interface CreateMerchantRequestModel {
    email: string;
    name: string;
    phone: string;
    acronym?: string | null;
    location: string;
}
