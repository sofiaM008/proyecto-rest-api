
import { Router } from 'express';
import {
  obtenerPrestamos,
  crearPrestamo,
  aceptarPrestamo,
  obtenerHistorial
} from '../controllers/loan.controller';
import { validateLoanPayload } from '../middlewares/validateLoan.middleware';

const router = Router();

router.get('/history', obtenerHistorial);
router.get('/search', obtenerHistorial);
router.get('/', obtenerPrestamos);
router.post('/', validateLoanPayload, crearPrestamo);
router.put('/:id/accept', aceptarPrestamo);

export default router;
