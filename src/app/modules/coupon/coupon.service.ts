import type { TCoupon } from "./coupon.interface.js";
import { CouponModel } from "./coupon.model.js";

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
  getSingleCouponByDB,
  getCouponByCodeFromDB,
  updateCouponByDB,
  deleteCouponByDB,
  increaseCouponUsedByDB,
};
