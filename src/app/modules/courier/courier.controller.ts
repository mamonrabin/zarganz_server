/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { courierService } from './courier.service.js';

const createCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courier = req.body;

    const result = await courierService.createCourierByDB(courier);
    res.status(200).json({
      success: true,
      message: 'Courier created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await courierService.getAllCourierByDB();
    res.status(200).json({
      success: true,
      message: 'all courier get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await courierService.getSingleCourierByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle courier successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData: any = { ...req.body };

    const result = await courierService.updateSingleCourierByDB(
      id as string,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle courier successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const deleteSingleCourier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await courierService.deleteSingleCourierByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle courier successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

export const courierController = {
  createCourier,
  getAllCourier,
  getSingleCourier,
  updateSingleCourier,
  deleteSingleCourier,
};
