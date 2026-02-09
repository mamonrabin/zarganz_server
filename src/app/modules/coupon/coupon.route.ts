import express from "express";
import { couponController } from "./coupon.controller.js";

const router = express.Router();

router.post("/create", couponController.createCoupon);
router.get("/", couponController.getAllCoupon);
router.get("/:id", couponController.getSingleCoupon);
router.get("/apply/:code", couponController.getCouponByCode);
router.patch("/:id", couponController.updateCoupon);
router.delete("/:id", couponController.deleteCoupon);

export const couponRoutes = router;
