import type { NextFunction, Request, Response } from "express";
import { wishlistService } from "./wishlist.servece.js";


/* ---------- Create Wishlist ---------- */
const createWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wishlistData = req.body; // expects { userRef: string, productRef: string[] }

    const result = await wishlistService.createWishlistByDB(wishlistData);

    res.status(201).json({
      success: true,
      message: "Wishlist created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get All Wishlists ---------- */
const getAllWishlist = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await wishlistService.getAllWishlistByDB();

    res.status(200).json({
      success: true,
      message: "All wishlists fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Wishlist By User ---------- */
const getWishlistByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const result = await wishlistService.getWishlistByUserFromDB(userId as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Get Single Wishlist ---------- */
const getSingleWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await wishlistService.getSingleWishlistByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Update Wishlist ---------- */
const updateWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await wishlistService.updateWishlistByDB(id as string, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------- Delete Wishlist ---------- */
const deleteWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await wishlistService.deleteWishlistByDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const wishlistController = {
  createWishlist,
  getAllWishlist,
  getWishlistByUser,
  getSingleWishlist,
  updateWishlist,
  deleteWishlist,
};
