import { Router } from "express";
import { getCajas, createCaja, upDateCaja } from "../controller/Caja.js";
import authMiddleware from "../middleware/middleware.js";

const router = Router();

router.get("/cajas", authMiddleware, getCajas);
router.post("/cajas", authMiddleware, createCaja);
router.put("/caja/:id", authMiddleware, upDateCaja);

export default router;