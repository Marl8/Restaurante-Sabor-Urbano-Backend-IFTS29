import express from 'express';
const router = express.Router();
import CustomerAPIController from '../controllers/CustomerAPIController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

router.post('/saveCustomer', verifyToken, CustomerAPIController.saveCustomerAPI); 
router.get('/findCustomer/getCostumers', verifyToken, CustomerAPIController.listCustomersAPI);
router.get('/findCustomer/:id', verifyToken, CustomerAPIController.findCustomerByIdAPI);
router.get('/findCustomer', verifyToken, CustomerAPIController.findCustomerByDniAPI);
router.put('/updateCustomer/:id', verifyToken, CustomerAPIController.updateCustomerAPI);
router.delete('/deleteCustomer/:id', verifyToken, CustomerAPIController.deleteCustomerAPI);

export default router;