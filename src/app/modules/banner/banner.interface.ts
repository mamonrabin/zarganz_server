import type { ObjectId } from "mongoose";

export type TBanner = {
  title?: string;
  image: string;
  category?: ObjectId;
  subCategory?: ObjectId;
  brand?: ObjectId;
  status: 'active' | 'inactive';
  type: 'main' | 'offer' | 'promotion';
};