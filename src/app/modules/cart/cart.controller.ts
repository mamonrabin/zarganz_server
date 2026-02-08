import type { NextFunction, Request, Response } from "express";
import { cartService } from "./cart.service.js";

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = req.body;

    const result = await cartService.addToCartByBD(cart);

    res.status(201).json({
      success: true,
      message: 'Cart item added successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getAllCartByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const result = await cartService.getAllCartByUserBD(userId as string);

    res.status(200).json({
      success: true,
      message: 'User cart retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getSingleCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await cartService.updateSingleCartByBD(id as string, {}); // reuse update to get?

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart item retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const updateSingleCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateCart = req.body;

    const result = await cartService.updateSingleCartByBD(id as string, updateCart);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart item updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteSingleCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await cartService.deleteSingleCartByBD(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Cart item deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const clearCartByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    await cartService.clearCartByUserBD(userId as string);

    res.status(200).json({
      success: true,
      message: 'User cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const cartController = {
  createCart,
  getAllCartByUser,
  getSingleCart,
  updateSingleCart,
  deleteSingleCart,
  clearCartByUser,
};
