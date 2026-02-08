import { model, Schema } from 'mongoose';
import type { TCart } from './cart.interface.js';

const cartSchema = new Schema<TCart>(
  {
    userRef: { type: Schema.Types.ObjectId, ref: 'user' },
    productRef: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const cartModel = model<TCart>('cart', cartSchema);
