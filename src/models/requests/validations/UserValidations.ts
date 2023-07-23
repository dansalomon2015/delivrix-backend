import * as yup from "yup";
import { PASSWORD_REGEX } from "../../../utils";
import { Privilege } from "@prisma/client";

export const registerUserSchema = yup.object({
    email: yup.string().required().email(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    privileges: yup
        .array()
        .of(
            yup
                .string()
                .oneOf([
                    Privilege.ADMIN_PRIVILEGE,
                    Privilege.CREATE_USERS,
                    Privilege.DELETE_USERS,
                    Privilege.EDIT_USERS,
                    Privilege.SUPER_PRIVILEGE,
                    Privilege.USER_PRIVILEGE,
                    Privilege.VIEW_USERS,
                ])
        ),
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
