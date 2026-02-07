


import type { ObjectId } from 'mongoose';



export type TProduct = {
  /* ---------- Core ---------- */
  title: string;
  slug?: string;

  quantity: number;
  soldQuantity?: number;

  mrpPrice: number;
  discount?: number;

  /* ---------- Virtuals (read-only) ---------- */
  price?: number;              // virtual
  availableQuantity?: number;  // virtual

  /* ---------- Details ---------- */
  short_details: string;
  description: string;

  /* ---------- Relations ---------- */
  category: ObjectId;
  subCategory?: ObjectId;
  brand: ObjectId;

  /* ---------- Media ---------- */
  thumbal_image: string;
  backview_image?:string;
  images: string[];
  video_url?: string;
  size_chart?: string;

  /* ---------- Shipping ---------- */
  freeShipping?: boolean;
  weight?: string;

  /* ---------- Inventory ---------- */
  sku?: string;
  barcode?: string;
  stock_status?: 'in stock' | 'out of stock' | 'pre order';

  /* ---------- Marketing ---------- */
  labels?: 'New' | 'Trending' | 'Limited Stock' | 'Sale' | 'Featured';

  /* ---------- System ---------- */
  isDeleted?: boolean;
};
