import type { NextFunction, Request, Response } from 'express';
import { privacyService } from './privacy.servece.js';


/* ---------- Create Privacy ---------- */
const createPrivacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const privacyData = req.body; 

    const result = await privacyService.createPrivacyByDB(privacyData);

    res.status(201).json({
      success: true,
      message: 'Privacy content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Privacy ---------- */
const getPrivacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await privacyService.getPrivacyByDB();

    res.status(200).json({
      success: true,
      message: 'Privacy content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Privacy ---------- */
const updatePrivacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await privacyService.updatePrivacyByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Privacy content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Privacy content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Privacy ---------- */
const deletePrivacy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await privacyService.deletePrivacyByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Privacy content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Privacy content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const privacyController = {
  createPrivacy,
  getPrivacy,
  updatePrivacy,
  deletePrivacy,
};
