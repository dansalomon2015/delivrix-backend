import { ApiResponseCodeType } from "../../types";

export class ApiResponse<T, R> {
    private message: string;
    private status: string;
    private statusCode: ApiResponseCodeType | number;
    private data: T | undefined;
    private errors: R | undefined;

    constructor(message: string, status: string, statusCode: number) {
        this.message = message;
        this.status = status;
        this.statusCode = statusCode;
    }

    public setData(data: T) {
        this.data = data;
    }

    public setErrors(errors: R) {
        this.errors = errors;
    }
}
