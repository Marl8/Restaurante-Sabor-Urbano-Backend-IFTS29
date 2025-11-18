import express from "express";
import UserWebController from "../controllers/UserWebController.js";

const router = express.Router();

router.get("/login", UserWebController.showLoginForm);
router.post("/login", UserWebController.loginWeb);
router.get("/logout", UserWebController.logoutWeb);


export default router;
