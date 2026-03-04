/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { reviewService } from './review.service.js';

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    const result = await reviewService.createReviewByDB(data as any);

    res.status(200).json({
      success: true,
      message: 'Review created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewService.getAllReviewByDB();
    res.status(200).json({
      success: true,
      message: 'all review get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReviewByPagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await reviewService.getAllReviewByPagination(req.query);
    res.status(200).json({
      success: true,
      message: 'all review get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await reviewService.getSingleReviewByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle review successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleReviewBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;
    const result = await reviewService.getSingleReviewBySlug(slug as string);
    res.status(200).json({
      success: true,
      message: 'get single review by slug successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await reviewService.deleteSingleReviewByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle review successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const reviewController = {
  createReview,
  getAllReview,
  getAllReviewByPagination,
  getSingleReview,
  getSingleReviewBySlug,
  deleteSingleReview,
};
