/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TCart } from './cart.interface.js';
import { cartModel } from './cart.model.js';

const addToCartByBD = async (cart: TCart) => {
  return cartModel.findOneAndUpdate(
    {
      userRef: cart.userRef,
      productRef: cart.productRef,
    } as any,
    {
      $inc: { quantity: cart.quantity || 1 },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
};

const getAllCartByUserBD = async (userId: string) => {
  return cartModel
    .find({ userRef: userId } as any)
    .populate('productRef')
    .lean();
};

const updateSingleCartByBD = async (id: string, updateCart: Partial<TCart>) => {
  return cartModel.findByIdAndUpdate(id, updateCart, {
    new: true,
    runValidators: true,
  });
};

const deleteSingleCartByBD = async (id: string) => {
  return cartModel.findByIdAndDelete(id);
};

const clearCartByUserBD = async (userId: string) => {
  return cartModel.deleteMany({ userRef: userId } as any);
};

export const cartService = {
  addToCartByBD,
  getAllCartByUserBD,
  updateSingleCartByBD,
  deleteSingleCartByBD,
  clearCartByUserBD,
};
