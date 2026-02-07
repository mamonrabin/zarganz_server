import type { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.service.js';

/* ---------- Sign In ---------- */
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, userData } = await authServices.login(req.body);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User logged in successfully',
      accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Sign Up ---------- */
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, userData } = await authServices.signup(req.body);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'User signed up successfully',
      accessToken,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};


const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authServices.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to email',
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code, newPassword } = req.body;

    await authServices.resetPassword(email, code, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
};
