import * as yup from "yup";
import { PASSWORD_REGEX } from "../../../utils";
import { PrivilegeType } from "../../../types";

export const registerUserSchema = yup.object({
    email: yup.string().required().email(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    privileges: yup.array().of(yup.string().oneOf(Object.values(PrivilegeType))),
    createdBy: yup.string().required(),
    password: yup
        .string()
        .required()
        .matches(PASSWORD_REGEX, "Password must contain only letters and numbers with a minimum of 8 characters"),
});

export const loginUserSchema = yup
    .object({
        email: yup.string().required().email(),
        password: yup
            .string()
            .required()
            .matches(PASSWORD_REGEX, "Password must contain only letters and numbers with a minimum of 8 characters"),
    })
    .required();
