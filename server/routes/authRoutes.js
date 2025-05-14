import express from 'express';
import { registerUser, loginUser, forgotPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', forgotPassword);

export default router;
