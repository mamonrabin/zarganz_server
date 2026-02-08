import type { ObjectId } from 'mongoose';

export type TCart = {
  userRef?: ObjectId;               
  productRef: ObjectId;
  quantity: number;

};
