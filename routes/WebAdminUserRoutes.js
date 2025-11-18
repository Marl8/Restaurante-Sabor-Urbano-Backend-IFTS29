import express from 'express';
import { requireLogin, requireRole } from "../middlewares/AuthWeb.js";
import AdminUserWebController from "../controllers/AdminUserWebController.js";

const router = express.Router();

router.use(requireLogin);
router.use(requireRole("Admin"));


router.get('/', AdminUserWebController.showUserMenu);
router.get('/add', AdminUserWebController.showAddUserForm);
router.get('/list', AdminUserWebController.listUsersWeb);
router.post('/save', AdminUserWebController.saveUserWeb);
router.get('/update/:id', AdminUserWebController.showUserToEdit);
router.post('/update/:id', AdminUserWebController.updateUserWeb);
router.get('/delete/:id', AdminUserWebController.showUserToDelete);
router.delete('/delete/:id', AdminUserWebController.deleteUserWeb);

export default router;
