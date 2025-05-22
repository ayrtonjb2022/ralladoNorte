import { Router } from "express";
const router = Router();
import {getClientes,createCliente,updateCliente,deleteCliente} from "../controller/Cliente.js";
import authMiddleware from "../middleware/middleware.js";

router.get("/clientes", authMiddleware,getClientes);
router.delete("/cliente/delete/:id", authMiddleware,deleteCliente);
router.post("/clientes", authMiddleware,createCliente);
router.put("/cliente/:id", authMiddleware,updateCliente);

export default router;