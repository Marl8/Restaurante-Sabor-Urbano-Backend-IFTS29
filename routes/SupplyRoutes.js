import express from 'express';
const router = express.Router();
import SupplyAPIController from '../controllers/SupplyAPIController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';


router.post('/saveSupply', verifyToken, SupplyAPIController.saveSupplyAPI);
router.get('/findSupplies', verifyToken, SupplyAPIController.findSuppliesAPI);
router.get('/findSupplyById/:id', verifyToken, SupplyAPIController.findSupplyByIdAPI);
router.put('/updateSupply/:id', verifyToken, SupplyAPIController.updateSupplyAPI);
router.patch('/updateStockSupply/:id',verifyToken,  SupplyAPIController.updateStockSupplyAPI);
router.delete('/deleteSupply/:id', verifyToken, SupplyAPIController.deleteSupplyAPI);


export default router;