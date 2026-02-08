import type { NextFunction, Request, Response } from 'express';
import { returnService } from './return.servece.js';



/* ---------- Create Returns ---------- */
const createReturns = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const returnsData = req.body; 

    const result = await returnService.createReturnByDB(returnsData);

    res.status(201).json({
      success: true,
      message: 'Returns content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Returns ---------- */
const getReturns = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await returnService.getReturnByDB();

    res.status(200).json({
      success: true,
      message: 'Returns content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Returns ---------- */
const updateReturns = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await returnService.updateReturnByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Returns content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Returns content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Returns ---------- */
const deleteReturns = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await returnService.deleteReturnByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Returns content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Returns content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const returnsController = {
  createReturns,
  getReturns,
  updateReturns,
  deleteReturns,
};
