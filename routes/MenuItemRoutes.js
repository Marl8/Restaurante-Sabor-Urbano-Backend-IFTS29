import express from 'express';
const router = express.Router();
import MenuItemAPIController from '../controllers/MenuItemAPIController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';

router.get('/findMenuItems', verifyToken, MenuItemAPIController.findMenuItemsAPI);
router.get('/findMenuItem/:id', verifyToken, MenuItemAPIController.findMenuItemByIdAPI);
router.post('/saveMenuItem/', verifyToken, MenuItemAPIController.saveMenuItemAPI);
router.put('/updateMenuItem/:id', verifyToken, MenuItemAPIController.updateMenuItemAPI);
router.patch('/updateStockItem/:id', verifyToken, MenuItemAPIController.updateStockItemAPI);
router.delete('/deleteMenuItem/:id', verifyToken, MenuItemAPIController.deleteMenuItemAPI);

export default router;