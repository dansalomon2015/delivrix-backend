import { Router } from "express";
import { UserController } from "../controllers";
import { UserRepository } from "../repositories";

const router = Router();

const userRepository = new UserRepository();
let userController = new UserController(userRepository);

router.get("/", (req, res) => {
    res.status(501).json({ error: "NotImplemented" });
});

router.post("/", userController.saveUser.bind(userController));

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
