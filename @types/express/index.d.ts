import { Express } from "express";
import { JwtAccessDecoded } from "../../src/models";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtAccessDecoded;
    }
}
