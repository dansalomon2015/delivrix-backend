import { CreateUserRequestModel } from "./CreateUserRequestModel";

export interface UpdateUserRequestModel extends CreateUserRequestModel {
    id: number;
}
