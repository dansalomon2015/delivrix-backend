import { Express } from "express";
import { JwtAccessDecoded } from "../../src/types";

declare module "express-serve-static-core" {
    interface Request {
        user?: JwtAccessDecoded;
    }
}
