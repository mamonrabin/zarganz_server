import type { ObjectId } from "mongoose";

export type TReview = {
  userID:ObjectId;
  productID:ObjectId;
  rating:number;
  comment?:string;
};