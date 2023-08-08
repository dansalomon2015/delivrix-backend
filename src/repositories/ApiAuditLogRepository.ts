import { Repository } from "./Repository";
import { Prisma } from "@prisma/client";

export class ApiAuditLogRepository extends Repository {
    constructor() {
        super();
    }

    async saveLog(url: string, method: string, params: object, response: object, createdBy: string, duration: number) {
        await this.prisma.apiAuditLog.create({
            data: {
                url,
                method,
                duration,
                params,
                response,
                createdBy,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }
}
