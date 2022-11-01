import { Router } from 'express';

import HealthController from './api/controllers/HealthController';
import OrganizationController from './api/controllers/OrganizationController';
import ShipmentController from './api/controllers/ShipmentController';

const router = Router();

// Router paths
router.get('/', HealthController.index);


router.post('/shipment', ShipmentController.create);
router.get('/shipments/:referenceId', ShipmentController.find);
router.get('/shipments/sum/:unit', ShipmentController.sumAll);

router.post('/organization', OrganizationController.create);
router.get('/organizations/:id', OrganizationController.find);


export default router;