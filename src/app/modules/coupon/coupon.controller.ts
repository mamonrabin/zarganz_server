
import type { NextFunction, Request, Response } from "express";
import { couponService } from "./coupon.service.js";

/* ---------- Create Coupon ---------- */
const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await couponService.createCouponByDB(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get All Coupons ---------- */
const getAllCoupon = async (_req: Request, res: Response,next: NextFunction) => {
  try {
    const result = await couponService.getAllCouponByDB();

    res.status(200).json({
      success: true,
      message: "Coupons retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Single Coupon ---------- */
const getSingleCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await couponService.getSingleCouponByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Coupon By Code (Frontend Apply) ---------- */
const getCouponByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;

    const result = await couponService.getCouponByCodeFromDB(code as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Invalid or inactive coupon",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Coupon ---------- */
const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await couponService.updateCouponByDB(id as string, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Coupon ---------- */
const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await couponService.deleteCouponByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const couponController = {
  createCoupon,
  getAllCoupon,
  getSingleCoupon,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
};
