import type { NextFunction, Request, Response } from 'express';
import { aboutService } from './about.servece.js';


/* ---------- Create About ---------- */
const createAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const aboutData = req.body; 

    const result = await aboutService.createAboutByDB(aboutData);

    res.status(201).json({
      success: true,
      message: 'About content created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get About ---------- */
const getAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await aboutService.getAboutByDB();

    res.status(200).json({
      success: true,
      message: 'About content fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update About ---------- */
const updateAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await aboutService.updateAboutByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About content updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete About ---------- */
const deleteAbout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await aboutService.deleteAboutByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'About content not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'About content deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const aboutController = {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
};
