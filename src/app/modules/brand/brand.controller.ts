/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { brandService } from './brand.service.js';

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = req.body;
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const file = req.file as any;
    const result = await brandService.createBrandByBD({
      ...brand,
      image: file.path, // Cloudinary URL
    });
    res.status(200).json({
      success: true,
      message: 'Brand created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await brandService.getAllBrandByBD();
    res.status(200).json({
      success: true,
      message: 'all brand get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await brandService.getSingleBrandByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBrandBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await brandService.getSingleBrandBySlug(slug as string);
    res.status(200).json({
      success: true,
      message: 'get single brand by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateBrand = {
      ...req.body,
      ...(imageUrl && { image: imageUrl }), // only overwrite if new image uploaded
    };
    const result = await brandService.updateSingleBrandByBD(id as string, updateBrand);
    res.status(200).json({
      success: true,
      message: 'update sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleBrand = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await brandService.deleteSingleBrandByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle brand successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const brandController = {
  createBrand,
  getAllBrand,
  getSingleBrand,
  getSingleBrandBySlug,
  updateSingleBrand,
  deleteSingleBrand,
};
