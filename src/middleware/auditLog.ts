import { NextFunction, Request, Response } from "express";
import { ApiAuditLogRepository } from "../repositories";

export const auditLog = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const auditLogRepository = new ApiAuditLogRepository();

    // Capture request data
    const { method, originalUrl, body, query, params, user } = req;

    // Override the response methods to capture the response data
    const oldSend = res.send;

    // @ts-ignore
    res.send = async function (data: any) {
        const duration = Date.now() - start;
        try {
            await auditLogRepository.saveLog(
                originalUrl,
                method,
                body as object,
                data as object,
                user ? user.email : "",
                duration
            );
        } catch (error) {
            console.log(error);
        }

        oldSend.call(this, data);
    };

    next();
};
