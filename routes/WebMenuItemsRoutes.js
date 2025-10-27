import express from "express";
import MenuItemWebController from '../controllers/MenuItemWebController.js';
const router = express.Router();




router.get("/", MenuItemWebController.showMenu); 
router.get("/add", MenuItemWebController.showAddForm);
router.get("/list", MenuItemWebController.listMenuItemsWeb);
router.get("/delete", MenuItemWebController.showMenuItemToDelete);
router.get("/update", MenuItemWebController.showMenuItemToEdit); 
router.post("/save", MenuItemWebController.saveMenuItemWeb);
router.post("/update/:id", MenuItemWebController.updateMenuItemWeb);
router.post("/delete/:id", MenuItemWebController.deleteMenuItemWeb);

export default router;