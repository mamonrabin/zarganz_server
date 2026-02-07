import express from 'express';
import { authController } from './auth.controller.js';



const router = express.Router();

router.post('/signup', (req, res, next) => {
  Promise.resolve(authController.signUp(req, res, next)).catch(next);
});

router.post('/login', (req, res, next) => {
  Promise.resolve(authController.signIn(req, res, next)).catch(next);
});

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword); 

export const authRoutes = router;