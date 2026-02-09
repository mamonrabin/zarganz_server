import { Schema, model } from "mongoose";
import type { TCoupon } from "./coupon.interface.js";

const couponSchema = new Schema<TCoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    discount: {
      type: Number,
      required: true,
      min: 0,
    },

    discountType: {
      type: String,
      enum: ["Percentage", "FixedAmount"],
      required: true,
    },

    useLimit: {
      type: Number,
      required: true,
      min: 1,
    },

    used: {
      type: Number,
      default: 0,
      min: 0,
    },

    perUserLimit: {
      type: Number,
      required: true,
      min: 1,
    },

    startDate: {
      type: Date,
      required: true,
    },

    expireDate: {
      type: Date,
      required: true,
    },

    couponType: {
      type: String,
      enum: ["brand", "category", "subCategory"],
      required: true,
    },

    userInfo: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CouponModel = model<TCoupon>("coupon", couponSchema);
