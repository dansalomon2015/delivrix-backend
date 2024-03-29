import { ValidateOptions } from "yup";

export const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
export const BCRYPT_SALT = 10;
export const DB_TOKEN_EXPIRY_PERIOD_IN_HOUR = 12;
export const DATA_VALIDATION_OPTIONS = {
    abortEarly: true,
    stripUnknown: true,
} as ValidateOptions;
