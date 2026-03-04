


import type { ObjectId } from 'mongoose';

export type TInventory = {
  color?: string;
  colorName?: string;
  size?: string;
  quantity: number;
};



export type TProduct = {
  /* ---------- Core ---------- */
  title: string;
  slug?: string;

  quantity: number;
  soldQuantity?: number;

  mrpPrice: number;
  discount?: number;

  discountType?: 'flat' | 'percentage';

 
  price?: number;              
  availableQuantity?: number; 

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

  inventoryType?: string;
  inventories?: TInventory[];

  /* ---------- Marketing ---------- */
  labels?: 'New' | 'Trending' | 'Limited_Stock' | 'Sale' | 'Featured';

  /* ---------- System ---------- */
  isDeleted?: boolean;
};
