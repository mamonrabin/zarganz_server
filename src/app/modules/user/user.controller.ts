/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { userService } from './user.service.js';

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = req.body;

//     const userData = {
//       ...user,
//       ...(req.file && { image: (req.file as any).path }), // optional image
//     };

//     const result = await userService.createUserByBD(userData);

//     res.status(201).json({
//       success: true,
//       message: 'User created successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;

    // Default avatar URL
    const DEFAULT_AVATAR = 'https://example.com/default-avatar.png';

    const userData = {
      ...user,
      image: req.file ? (req.file as any).path : DEFAULT_AVATAR, // use uploaded image or default
    };

    const result = await userService.createUserByBD(userData);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAllUserByBD();
    res.status(200).json({
      success: true,
      message: 'all user get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle user successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateUser = {
      ...req.body,
      ...(req.file && { image: (req.file as any).path }), // optional image update
    };

    const result = await userService.updateSingleUserByBD(
      id as string,
      updateUser,
    );

    res.status(200).json({
      success: true,
      message: 'Single user updated successfully', // fixed typo
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteSingleUserByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle user successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
