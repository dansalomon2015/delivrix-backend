import { Request, Response, Router } from "express";
import { MerchantRepository } from "../repositories";
import { MerchantController } from "../controllers/MerchantController";
import { Privilege } from "@prisma/client";
import { accessPrivilege, auth } from "../middleware";

const router = Router();

const merchantRepository = new MerchantRepository();
const merchantController = new MerchantController(merchantRepository);

router.post(
    "/register",
    [auth, accessPrivilege([Privilege.SUPER_PRIVILEGE, Privilege.REGISTER_MERCHANT])],
    merchantController.saveMerchant.bind(merchantController)
);

router.get("/", (req, res) => {
    res.status(501).json({ error: "NotImplemented" });
});

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
