/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { blogService } from './blog.service.js';

// const createBlog = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const blog = req.body;
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Image is required',
//       });
//     }

//     const file = req.file as any;
//     const result = await blogService.createBlogByDB({
//       ...blog,
//       image: file.path, // Cloudinary URL
//     });
//     res.status(200).json({
//       success: true,
//       message: 'Blog created successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// const createBlog = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const blog = req.body;

//     if (!blog.title || !blog.description) {
//       return res.status(400).json({
//         success: false,
//         message: 'Title and description are required',
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'Image is required',
//       });
//     }

//     const file = req.file as any;

//     const result = await blogService.createBlogByDB({
//       ...blog,
//       image: file.path, // Cloudinary URL
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Blog created successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };





const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = req.body;

    if (!blog.title || !blog.description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // ✅ safe cast
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // check main image exists
    const mainImage = files?.image?.[0]?.path;
    if (!mainImage) {
      return res.status(400).json({
        success: false,
        message: 'Main image is required',
      });
    }

    // optional gallery images
    const galleryImages = files?.images?.map((file) => file.path) || [];

    const blogData = {
      ...blog,
      image: mainImage,
      images: galleryImages,
    };

    const result = await blogService.createBlogByDB(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await blogService.getAllBlogByDB();
    res.status(200).json({
      success: true,
      message: 'all blog get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogByPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await blogService.getAllBlogByPagination(
      req.query,
    );
    res.status(200).json({
      success: true,
      message: 'all blog get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await blogService.getSingleBlogByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle blog successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await blogService.getSingleBlogBySlug(slug as string);
    res.status(200).json({
      success: true,
      message: 'get single blog by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateBlog = {
      ...req.body,
      ...(imageUrl && { image: imageUrl }), // only overwrite if new image uploaded
    };
    const result = await blogService.updateSingleBlogByDB(id as string, updateBlog);
    res.status(200).json({
      success: true,
      message: 'update sinngle blog successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await blogService.deleteSingleBlogByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle blog successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const blogController = {
  createBlog,
  getAllBlog,
  getAllBlogByPagination,
  getSingleBlog,
  getSingleBlogBySlug,
  updateSingleBlog,
  deleteSingleBlog,
};
