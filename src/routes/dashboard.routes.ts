import { Router } from 'express';
import { DashboardController } from '../controllers/panel.controlador';

const router = Router();

router.get('/summary', DashboardController.getSummary);

export default router;

