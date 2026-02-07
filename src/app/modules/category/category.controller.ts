/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { categoryService } from './category.service.js';



const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const file = req.file as any;

    const categoryData = {
      title,
      image: file.path, // Cloudinary URL
    };

    const result = await categoryService.createCategoryByDB(categoryData as any);

    res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await categoryService.getAllCategoryByDB();
    res.status(200).json({
      success: true,
      message: 'all category get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryService.getSingleCategoryByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await categoryService.getSingleCategoryBySlug(slug as string);
    res.status(200).json({
      success: true,
      message: 'get single category by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// const updateSingleCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { id } = req.params;
//     const updateCategory = req.body;
//     const result = await categoryService.updateSingleCategoryByDB(
//       id as string,
//       updateCategory,
//     );
//     res.status(200).json({
//       success: true,
//       message: 'update sinngle category successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


const updateSingleCategory = async (
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

    const result = await categoryService.updateSingleCategoryByDB(
      id as string,
      updateData,
    );

    res.status(200).json({
      success: true,
      message: 'update single category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteSingleCategoryByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle category successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  getSingleCategoryBySlug,
  updateSingleCategory,
  deleteSingleCategory,
};
