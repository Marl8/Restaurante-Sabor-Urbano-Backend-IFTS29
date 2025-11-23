import express from "express";
import { requireLogin, requireRole } from "../middlewares/AuthWeb.js"
import DeliveryWebController from "../controllers/DeliveryWebController.js";
const router = express.Router();

// Proteger TODAS las rutas de customers (no es ia):
router.use(requireLogin);
router.use(requireRole("Admin", "Employee"));


router.get("/", DeliveryWebController.showDeliveryMenu); 
router.get("/add", DeliveryWebController.showAddForm);
router.get("/list", DeliveryWebController.listDeliveries);
router.get("/delete", DeliveryWebController.showDeliveryToDelete);
router.get("/update", DeliveryWebController.showDeliveryToEdit); 

router.put("/update/:id", DeliveryWebController.updateDeliveryWeb);
router.post("/save", DeliveryWebController.saveDeliveryWeb);
router.post("/add/findCustomer", DeliveryWebController.findCustomerByDni);

router.delete("/delete/:id", DeliveryWebController.deleteDeliveries);

export default router;