import type { NextFunction, Request, Response } from 'express';
import { orderPolicyService } from './orderPolicy.servece.js';


/* ---------- Create OrderPolicy ---------- */
const createOrderPolicy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderPolicyData = req.body; 

    const result = await orderPolicyService.createOrderPolicyByDB(orderPolicyData);

    res.status(201).json({
      success: true,
      message: 'OrderPolicy content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get OrderPolicy ---------- */
const getOrderPolicy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderPolicyService.getOrderPolicyByDB();

    res.status(200).json({
      success: true,
      message: 'OrderPolicy content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update OrderPolicy ---------- */
const updateOrderPolicy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await orderPolicyService.updateOrderPolicyByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'OrderPolicy content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'OrderPolicy content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete OrderPolicy ---------- */
const deleteOrderPolicy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await orderPolicyService.deleteOrderPolicyByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'OrderPolicy content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'OrderPolicy content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderPolicyController = {
  createOrderPolicy,
  getOrderPolicy,
  updateOrderPolicy,
  deleteOrderPolicy,
};
