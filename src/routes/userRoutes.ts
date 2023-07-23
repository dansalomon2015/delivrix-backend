import { Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";
import { accessPrivilege, auth } from "../middleware";
import { Privilege } from "@prisma/client";

const router = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post("/register", userController.saveUser.bind(userController));
router.post("/me", userController.login.bind(userController));
router.get("/", [auth, accessPrivilege([Privilege.SUPER_PRIVILEGE])], userController.getAll.bind(userController));

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `NotImplemented ${id}` });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `NotImplemented ${id}` });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(501).json({ error: `NotImplemented ${id}` });
});

export default router;
