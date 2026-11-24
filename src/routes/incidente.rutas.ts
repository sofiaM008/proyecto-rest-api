import { Router } from 'express';
import { IncidentController } from '../controllers/controlador.de.incidente';
import { validateIncidentPayload } from '../middlewares/validarIncident.middleware';

const router = Router();

router.post('/', validateIncidentPayload, IncidentController.createIncident);
router.get('/', IncidentController.getIncidents);
router.patch('/:id', IncidentController.updateIncident);

export default router;

