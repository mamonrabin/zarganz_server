import type { ObjectId } from "mongoose";

export type TBanner = {
  title?: string;
  image: string;
  category?: ObjectId;
  subCategory?: ObjectId;
  brand?: ObjectId;
  description?: string;
  status: 'active' | 'inactive';
  bannertype: 'main' | 'offer' | 'promotion';
};