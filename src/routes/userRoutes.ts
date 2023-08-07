import { Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { accessPrivilege, auth } from "../middleware";
import { PrivilegeType } from "../types";

const router = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post("/register", userController.saveUser.bind(userController));
router.post("/me", userController.login.bind(userController));
router.get(
    "/",
    [auth, accessPrivilege([PrivilegeType.SUPER_PRIVILEGE, PrivilegeType.VIEW_USERS])],
    userController.getAll.bind(userController)
);

router.get(
    "/:id",
    [auth, accessPrivilege([PrivilegeType.SUPER_PRIVILEGE, PrivilegeType.VIEW_USERS])],
    userController.getOne.bind(userController)
);

router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `NotImplemented ${id}` });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `NotImplemented ${id}` });
});

export default router;
