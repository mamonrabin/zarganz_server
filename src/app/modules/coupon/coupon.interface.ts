import type { ObjectId } from 'mongoose';

export type TCoupon = {
  code: string;
  discount: number;
  useLimit: number;
  used?: number;
  perUserLimit: number;
  startDate: Date;
  expireDate: Date;
  discountType: 'Percentage' | 'FixedAmount';
  userInfo?: ObjectId;
  couponType: 'brand' | 'category' | 'subCategory';
  isActive: boolean;
};
