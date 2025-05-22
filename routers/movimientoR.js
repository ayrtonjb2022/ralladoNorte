import { Router } from "express";
const router = Router();
import { createMovimiento, getMovimientos, deleteMovimiento, getAllVentas} from "../controller/Movimiento.js";
import authMiddleware from "../middleware/middleware.js";

router.get("/movimiento", authMiddleware,getMovimientos);
router.get("/movimiento/ventas", authMiddleware,getAllVentas);
router.post("/movimiento", authMiddleware,createMovimiento);
router.delete("/movimiento/:id", authMiddleware,deleteMovimiento);

export default router;