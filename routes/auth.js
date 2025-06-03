import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login",  authController.login);
router.post("/logout",  authController.logout); // optional for stateless logout

export default router;
