import express from 'express';
const router = express.Router();
import UserAPIController from '../controllers/UserAPIController.js';
import { verifyToken, isAdmin } from '../middlewares/AuthMiddleware.js';

router.get('/findUsers', verifyToken, isAdmin, UserAPIController.findUsersAPI);
router.get('/findUser/:id', verifyToken, isAdmin, UserAPIController.findUserByIdAPI);
router.get('/findUser', verifyToken, isAdmin, UserAPIController.findUserByDniAPI);
router.post('/saveUser/', verifyToken, isAdmin, UserAPIController.saveUserAPI);
router.put('/updateUser/:id', verifyToken, isAdmin, UserAPIController.updateUserAPI);
router.delete('/deleteUser/:id', verifyToken, isAdmin, UserAPIController.deleteUserAPI);
router.post('/login', UserAPIController.loginAPI);

export default router;