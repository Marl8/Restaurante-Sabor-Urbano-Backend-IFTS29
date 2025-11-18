import express from 'express';
import DeliveryOrderController from '../controllers/DeliveryOrderController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
const router = express.Router();


// Crear pedido propio/manual
router.post('/create', verifyToken, DeliveryOrderController.crearPedido);

// Listar pedidos propios/confirmados
router.get('/', verifyToken, DeliveryOrderController.listarPedidos);

// Despachar pedido
router.post('/dispatch/:id', verifyToken, DeliveryOrderController.despacharPedido);

export default router;

