export class DataValidationError {
    errors: string[];
    constructor(errors: string[]) {
        this.errors = errors;
    }
}
