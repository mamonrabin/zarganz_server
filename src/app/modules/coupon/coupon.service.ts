/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from "../../../utilities/buildAggregatePipeline.js";
import { getPaginationOptions } from "../../../utilities/pagination.js";
import { QueryBuilder } from "../../../utilities/QueryBuilder.js";
import { getSortOptions } from "../../../utilities/sort.js";
import type { TCoupon } from "./coupon.interface.js";
import { CouponModel } from "./coupon.model.js";



const queryCoupon = async (pipeline: any[]) => {
  return await CouponModel.aggregate(pipeline);
};

/* ---------- Create Coupon ---------- */
const createCouponByDB = async (coupon: TCoupon) => {
  const result = await CouponModel.create(coupon);
  return result;
};

/* ---------- Get All Coupons ---------- */
const getAllCouponByDB = async () => {
  const result = await CouponModel.find().sort({ createdAt: -1 });
  return result;
};

const getAllCouponByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryCoupon(pipeline);

  const total = await CouponModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
};

/* ---------- Get Single Coupon ---------- */
const getSingleCouponByDB = async (id: string) => {
  const result = await CouponModel.findById(id);
  return result;
};

/* ---------- Get Coupon By Code ---------- */
const getCouponByCodeFromDB = async (code: string) => {
  const result = await CouponModel.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });
  return result;
};

/* ---------- Update Coupon ---------- */
const updateCouponByDB = async (
  id: string,
  updateCoupon: Partial<TCoupon>
) => {
  const result = await CouponModel.findByIdAndUpdate(id, updateCoupon, {
    new: true,
    runValidators: true,
  });
  return result;
};

/* ---------- Delete Coupon ---------- */
const deleteCouponByDB = async (id: string) => {
  const result = await CouponModel.findByIdAndDelete(id);
  return result;
};

/* ---------- Increase Coupon Used Count ---------- */
const increaseCouponUsedByDB = async (id: string) => {
  const result = await CouponModel.findByIdAndUpdate(
    id,
    { $inc: { used: 1 } },
    { new: true }
  );
  return result;
};

export const couponService = {
  createCouponByDB,
  getAllCouponByDB,
  getAllCouponByPagination,
  getSingleCouponByDB,
  getCouponByCodeFromDB,
  updateCouponByDB,
  deleteCouponByDB,
  increaseCouponUsedByDB,
};
