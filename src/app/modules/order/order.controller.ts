import type { NextFunction, Request, Response } from 'express';
import { orderService } from './order.service.js';

/* ---------- Create Order ---------- */
const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderData = req.body;

    const result = await orderService.createOrderByBD(orderData);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get All Orders ---------- */
const getAllOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.getAllOrderByBD();

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Single Order ---------- */
const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await orderService.getSingleOrderByBD(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Single Order ---------- */
const updateSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await orderService.updateSingleOrderByBD(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Single Order ---------- */
const deleteSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await orderService.deleteSingleOrderByBD(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateSingleOrder,
  deleteSingleOrder,
};
