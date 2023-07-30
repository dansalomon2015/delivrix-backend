import { Merchant } from "@prisma/client";
import { Repository } from "./Repository";
import { CreateMerchantRequestModel } from "../models";

export class MerchantRepository extends Repository {
    constructor() {
        super();
    }

    async save(merchantData: CreateMerchantRequestModel, createdBy: string): Promise<Merchant> {
        const merchant: Merchant = await this.prisma.merchant.create({
            data: {
                ...merchantData,
                createdBy,
                active: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return merchant;
    }
}
