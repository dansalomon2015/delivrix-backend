import { Retailer } from "@prisma/client";
import { Repository } from "./Repository";

export class RetailerRepository extends Repository {
    constructor() {
        super();
    }

    async findAll(): Promise<Retailer[]> {
        const retailers = await this.prisma.retailer.findMany();
        return retailers;
    }

    async findRetailersByMerchantId(merchantId: number): Promise<Retailer[]> {
        const retailers = await this.prisma.retailer.findMany({
            where: {
                merchantId,
            },
        });
        return retailers;
    }

    async toggleRetailer(id: number, active: boolean) {
        await this.prisma.retailer.update({
            where: { id },
            data: { active },
        });
    }
}
