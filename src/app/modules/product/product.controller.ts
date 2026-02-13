/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { productService } from './product.service.js';

import { productModel } from './product.model.js';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      thumbal_image?: Express.Multer.File[];
      backview_image?: Express.Multer.File[];
      images?: Express.Multer.File[];
    };

    const productData = {
      ...req.body,
      thumbal_image: files?.thumbal_image?.[0]?.path,
      backview_image: files?.backview_image?.[0]?.path,
      images: files?.images?.map(f => f.path) || [],
    };

    const product = await productService.createProductByBD(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
    });
  }
};

const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productService.getAllProductByBD();
    res.status(200).json({
      success: true,
      message: 'all product get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllProductByPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await productService.getAllProductByBDWithPagination(
      req.query,
    );
    res.status(200).json({
      success: true,
      message: 'all product get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getNewArrivalProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getNewArrivalProducts(limit);
    res.status(200).json({
      success: true,
      message: 'new arrival products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getDiscountProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getDiscountProducts(limit);
    res.status(200).json({
      success: true,
      message: 'discount products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getBestSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getBestSellerProducts(limit);
    res.status(200).json({
      success: true,
      message: 'best seller products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTrendingProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await productService.getTrendingProducts(limit);
    res.status(200).json({
      success: true,
      message: 'trnding products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const getReletiveProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params; // Product ID from route
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const result = await productService.getRelatedProducts(id as string, limit);

    res.status(200).json({
      success: true,
      message: 'Relative products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await productService.getSingleProductByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await productService.getSingleProductBySlug(slug as string);
    res.status(200).json({
      success: true,
      message: 'get single product by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: 'Not found' });

    const files = req.files as any;

    if (files?.thumbal_image?.[0])
      product.thumbal_image = files.thumbal_image[0].path;

    if (files?.backview_image?.[0])
      product.backview_image = files.backview_image[0].path;

    if (files?.images?.length)
      product.images = files.images.map((f: any) => f.path);

    Object.assign(product, req.body);
    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

const getReletiveProductBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await productService.getRelatedProductsBySlug(
      slug as string,
      8,
    );

    res.status(200).json({
      success: true,
      message: 'Relative products fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await productService.deleteSingleProductByBD(id as string);
    res.status(200).json({
      success: true,
      message: 'delete single product successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  createProduct,
  getAllProduct,
  getAllProductByPagination,
  getSingleProduct,
  getSingleProductBySlug,
  updateSingleProduct,
  deleteSingleProduct,
  getNewArrivalProducts,
  getDiscountProducts,
  getBestSellerProducts,
  getTrendingProducts,
  getReletiveProduct,
  getReletiveProductBySlug,
};
