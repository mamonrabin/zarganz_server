/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TWishlist } from "./wishlist.interface.js";
import { wishlistModel } from "./wishlist.model.js";

/* ---------- Create Wishlist ---------- */
const createWishlistByDB = async (wishlist: TWishlist) => {
  const result = await wishlistModel.create(wishlist);
  return result;
};

/* ---------- Get All Wishlists ---------- */
const getAllWishlistByDB = async () => {
  const result = await wishlistModel.find().populate("productRef userRef");
  return result;
};

/* ---------- Get Wishlist By User ---------- */
const getWishlistByUserFromDB = async (userId: string) => {
  const result = await wishlistModel
    .findOne({ userRef: userId } as any)
    .populate("productRef");
  return result;
};

/* ---------- Get Single Wishlist ---------- */
const getSingleWishlistByDB = async (id: string) => {
  const result = await wishlistModel
    .findById(id)
    .populate("productRef userRef");
  return result;
};

/* ---------- Update Wishlist ---------- */
const updateWishlistByDB = async (
  id: string,
  updateWishlist: Partial<TWishlist>
) => {
  const result = await wishlistModel.findByIdAndUpdate(
    id,
    updateWishlist,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

/* ---------- Delete Wishlist ---------- */
const deleteWishlistByDB = async (id: string) => {
  const result = await wishlistModel.findByIdAndDelete(id);
  return result;
};

export const wishlistService = {
  createWishlistByDB,
  getAllWishlistByDB,
  getWishlistByUserFromDB,
  getSingleWishlistByDB,
  updateWishlistByDB,
  deleteWishlistByDB,
};
