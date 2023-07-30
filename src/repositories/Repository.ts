import { PrismaClient } from "@prisma/client";

export class Repository {
    public prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ errorFormat: "pretty" });
    }
}
