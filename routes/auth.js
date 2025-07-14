import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

router.post("/signup", signup);
router.post("/login",  login);
router.post("/logout", logout); // optional for stateless logout

export default router;
