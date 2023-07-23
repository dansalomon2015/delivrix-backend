import { Request } from "express";

export interface JwtAccessDecoded {
    id: number;
    email: string;
}

export interface CustomRequest extends Request {
    user: JwtAccessDecoded;
}
