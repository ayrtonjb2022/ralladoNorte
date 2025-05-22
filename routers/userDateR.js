
import { Router } from "express";
import { getUserById, deleteUser,upDatePassword, updateUser } from "../controller/User.js";
import authMiddleware from "../middleware/middleware.js";

const router = Router();

router.get("/user/me", authMiddleware, getUserById);
router.put("/user/delete", authMiddleware, deleteUser);
router.put("/user/upDatePassword", authMiddleware, upDatePassword);

router.put("/user/update", authMiddleware, updateUser);

export default router;
