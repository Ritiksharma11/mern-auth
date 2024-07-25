import express from 'express';
import { login, signUp } from '../Controllers/authController.js';
import { loginValidation, signUpValidation } from '../Middlewares/authValidation.js';

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);

export default router;