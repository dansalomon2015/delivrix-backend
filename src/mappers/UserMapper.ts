import { Privilege, User } from "@prisma/client";
import { UserModel } from "../models";
import { PrivilegeType } from "../types";

export class UserMapper {
    public static mapToUserModel(user: User): UserModel {
        return {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            active: user.active,
            createdAt: user.createdAt,
            createdBy: user.createdBy,
            lastLogin: user.lastLogin,
            lastName: user.lastName,
            updatedAt: user.updatedAt,
            imageUrl: user.imageUrl,
            token: user.token,
            privileges: user.privileges,
            tokenExpiryDate: user.tokenExpiryDate,
        };
    }

    public static mapToUserPrivileges(privileges: Privilege[]): PrivilegeType[] {
        let mappedPrivileges: PrivilegeType[] = [];

        privileges.forEach((p) => {
            switch (p) {
                case Privilege.ADMIN_PRIVILEGE:
                    return mappedPrivileges.push(PrivilegeType.ADMIN_PRIVILEGE);
                case Privilege.CREATE_USERS:
                    return mappedPrivileges.push(PrivilegeType.CREATE_USERS);
                case Privilege.DELETE_USERS:
                    return mappedPrivileges.push(PrivilegeType.DELETE_USERS);
                case Privilege.EDIT_USERS:
                    return mappedPrivileges.push(PrivilegeType.EDIT_USERS);
                case Privilege.SUPER_PRIVILEGE:
                    return mappedPrivileges.push(PrivilegeType.SUPER_PRIVILEGE);
                case Privilege.VIEW_USERS:
                    return mappedPrivileges.push(PrivilegeType.VIEW_USERS);

                default:
                    return mappedPrivileges.push(PrivilegeType.USER_PRIVILEGE);
            }
        });

        return mappedPrivileges;
    }
}
