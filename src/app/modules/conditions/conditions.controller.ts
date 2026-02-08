import type { NextFunction, Request, Response } from 'express';
import { conditionsService } from './conditions.servece.js';


/* ---------- Create Conditions ---------- */
const createConditions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conditionsData = req.body; 

    const result = await conditionsService.createConditionsByDB(conditionsData);

    res.status(201).json({
      success: true,
      message: 'Conditions content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Conditions ---------- */
const getConditions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await conditionsService.getConditionsByDB();

    res.status(200).json({
      success: true,
      message: 'Conditions content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Conditions ---------- */
const updateConditions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await conditionsService.updateConditionsByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Conditions content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conditions content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Conditions ---------- */
const deleteConditions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await conditionsService.deleteConditionsByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Conditions content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Conditions content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const conditionsController = {
  createConditions,
  getConditions,
  updateConditions,
  deleteConditions,
};
