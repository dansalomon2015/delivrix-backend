import { Router } from "express";

const router = Router();

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
