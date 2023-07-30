import { NextFunction, Request, Response } from "express";
import { MerchantRepository } from "../repositories";
import { DataValidationError } from "../utils/DataValidationError";
import { ApiResponse, CreateMerchantRequestModel, registerMerchantSchemas } from "../models";
import { ApiResponseCodeType, HTTP_RESPONSE_CODES } from "../types";
import { Merchant } from "@prisma/client";
import { DATA_VALIDATION_OPTIONS } from "../utils";

export class MerchantController {
    private merchantRepository: MerchantRepository;

    constructor(merchantRepository: MerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    public saveMerchant(req: Request, res: Response, next: NextFunction) {
        try {
            const merchantData = registerMerchantSchemas.validateSync(
                req.body,
                DATA_VALIDATION_OPTIONS
            ) as unknown as CreateMerchantRequestModel;

            this.merchantRepository
                .save(merchantData, req.user?.email!)
                .then((merchant) => {
                    let response = new ApiResponse<Merchant, any>(
                        "Operation successful",
                        "Success",
                        ApiResponseCodeType.SUCCESS
                    );
                    response.setData(merchant);
                    res.status(HTTP_RESPONSE_CODES.OK).json(response);
                })
                .catch(next);
        } catch (error: any) {
            next(new DataValidationError(error.errors));
        }
    }
}
