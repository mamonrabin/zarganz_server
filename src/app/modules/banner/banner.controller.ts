/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { bannerService } from './banner.service.js';

const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const banner = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const file = req.file as any;

    const bannerData = {
      ...banner,
      image: file.path, // Cloudinary URL
    };

    const result = await bannerService.createBannerByDB(bannerData);
    res.status(200).json({
      success: true,
      message: 'Banner created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: 'Internal server error',
    //   error: error,
    // });
    // using global error handler
    next(error);
  }
};

const getAllBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await bannerService.getAllBannerByDB();
    res.status(200).json({
      success: true,
      message: 'all banner get successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const getSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await bannerService.getSingleBannerByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const updateSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData: any = { ...req.body };

    if (req.file) {
      const file = req.file as any;
      updateData.image = file.path; // new Cloudinary image
    }
    const result = await bannerService.updateSingleBannerByDB(
      id as string,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const deleteSingleBanner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await bannerService.deleteSingleBannerByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle banner successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

export const bannerController = {
  createBanner,
  getAllBanner,
  getSingleBanner,
  updateSingleBanner,
  deleteSingleBanner,
};
