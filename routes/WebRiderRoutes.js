import express from 'express';
import { requireLogin } from "../middlewares/AuthWeb.js"
const router = express.Router();

import RiderWebController from '../controllers/RiderWebController.js';

// Proteger TODAS las rutas de customers:
router.use(requireLogin);

// ==== Muestra el menú principal de repartidores ==== 
router.get('/', RiderWebController.showRiderMenu);

// ======= Muestra el formulario para agregar ====== 
router.get('/add', RiderWebController.showAddRiderForm);

// ======== Muestra la lista completa  ==========
router.get('/list', RiderWebController.listRidersWeb);

// ==== Maneja el envío del formulario para guardar  ==== 
router.post('/save', RiderWebController.saveRiderWeb);


router.get('/update/:id', RiderWebController.showRiderToEdit);


router.post('/update/:id', RiderWebController.updateRiderWeb);

router.get('/delete/:id', RiderWebController.showRiderToDelete);

router.delete('/delete/:id', RiderWebController.deleteRiderWeb);



export default router;