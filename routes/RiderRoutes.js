import express from 'express';
const router = express.Router();
import RiderAPIController from '../controllers/RiderAPIController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

router.get('/findRiders', verifyToken, RiderAPIController.findRidersAPI);
router.get('/findRider/:id', verifyToken, RiderAPIController.findRiderByIdAPI);
router.get('/findRider', verifyToken, RiderAPIController.findRiderByDniAPI);
router.post('/saveRider', verifyToken, RiderAPIController.saveRiderAPI);
router.put('/updateRider/:id', verifyToken, RiderAPIController.updateRiderAPI);
router.patch('/updateStateRider/:id', verifyToken, RiderAPIController.updateRiderStateAPI);
router.delete('/deleteRider/:id', verifyToken, RiderAPIController.deleteRiderAPI);

export default router;