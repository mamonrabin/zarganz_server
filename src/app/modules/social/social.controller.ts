import type { NextFunction, Request, Response } from 'express';
import { socialService } from './social.servece.js';


/* ---------- Create Social ---------- */
const createSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const socialData = req.body; 

    const result = await socialService.createSocialByDB(socialData);

    res.status(201).json({
      success: true,
      message: 'Social content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Social ---------- */
const getSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await socialService.getSocialByDB();

    res.status(200).json({
      success: true,
      message: 'Social content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Social ---------- */
const updateSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await socialService.updateSocialByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Social content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Social content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Social ---------- */
const deleteSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await socialService.deleteSocialByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Social content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Social content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const socialController = {
  createSocial,
  getSocial,
  updateSocial,
  deleteSocial,
};
