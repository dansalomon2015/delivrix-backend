import * as yup from "yup";

export const registerMerchantSchemas = yup.object({
    email: yup.string().required().email(),
    name: yup.string().required(),
    phone: yup.string().required(),
    acronym: yup.string().notRequired(),
    location: yup.string().required(),
});
