import express from "express";
import { requireLogin } from "../middlewares/AuthWeb.js"
import SupplyWebController from "../controllers/SupplyWebController.js";
const router = express.Router();

// Proteger TODAS las rutas de customers:
router.use(requireLogin);

router.get("/", SupplyWebController.showSupplyMenu); 
router.post("/save", SupplyWebController.saveSupplyWeb);
router.get("/add", SupplyWebController.showAddSupplyForm);
router.get("/list", SupplyWebController.listSuppliesWeb);
router.get("/update", SupplyWebController.showSupplyToEdit); 
router.post("/update/:id", SupplyWebController.updateSupplyWeb);
router.get("/delete", SupplyWebController.showSupplyToDelete);
router.delete("/delete/:id", SupplyWebController.deleteSupplyWeb); 

export default router;