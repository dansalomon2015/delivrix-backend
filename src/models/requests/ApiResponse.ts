import { ApiResponseCodeType } from "../../types";

export class ApiResponse {
    private message: string;
    private status: string;
    private statusCode: ApiResponseCodeType | number;
    private data: any;

    constructor(message: string, status: string, statusCode: number) {
        this.message = message;
        this.status = status;
        this.statusCode = statusCode;
    }

    public setData(data: any) {
        this.data = data;
    }
}
