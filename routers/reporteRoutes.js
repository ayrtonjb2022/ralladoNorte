// routes/reporteRoutes.js
import express from 'express';
import { generarReportePDF } from '../controller/reporteController.js';
import authMiddleware from '../middleware/middleware.js';

const router = express.Router();

router.post('/generar-pdf', authMiddleware, generarReportePDF);

export default router;
