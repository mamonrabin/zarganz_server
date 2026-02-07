import { model, Schema, type HydratedDocument } from 'mongoose';
import SlugUtils from '../../../utilities/slug.utils.js';
import type { TProduct } from './product.interface.js';

const { generateSlug } = SlugUtils;

const STOCK_STATUS = ['in stock', 'out of stock', 'pre order'] as const;
const LABELS = [
  'New',
  'Trending',
  'Limited Stock',
  'Sale',
  'Featured',
] as const;

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, unique: true, index: true },

    quantity: { type: Number, required: true, min: 0 },
    soldQuantity: { type: Number, default: 0, min: 0 },

    mrpPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100 },

    description: { type: String, required: true },
    short_details: { type: String },

    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory' },
    brand: { type: Schema.Types.ObjectId, ref: 'brand', required: true },

    thumbal_image: { type: String, required: true },
    backview_image: { type: String },
    images: { type: [String], default: [] },

    video_url: { type: String },
    size_chart: { type: String },

    freeShipping: { type: Boolean, default: false },
    weight: { type: String },

    sku: { type: String, unique: true, index: true },
    barcode: { type: String, unique: true },

    stock_status: {
      type: String,
      enum: STOCK_STATUS,
      default: 'in stock',
      index: true,
    },

    labels: { type: String, enum: LABELS },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* ---------- Virtuals ---------- */
productSchema.virtual('price').get(function () {
  if (this.discount != null) {
    return this.mrpPrice - (this.mrpPrice * this.discount) / 100;
  }
  return this.mrpPrice;
});

productSchema.virtual('availableQuantity').get(function () {
  return Math.max(this.quantity - (this.soldQuantity || 0), 0);
});

/* ---------- FAST middleware (save only) ---------- */
productSchema.pre('save', function () {
  const product = this as HydratedDocument<TProduct>;

  if ((product.isNew || product.isModified('title')) && product.title) {
    product.slug = `${generateSlug(product.title)}-${Date.now()
      .toString()
      .slice(-5)}`;
  }

  if (!product.sku && product.title && product.brand) {
    product.sku = `${product.title
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, 4)}-${product.brand
      .toString()
      .slice(-4)
      .toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  if (!product.barcode && product.sku) {
    product.barcode = product.sku.replace(/[^A-Z0-9]/gi, '');
  }

  product.stock_status =
    product.quantity - (product.soldQuantity || 0) <= 0
      ? 'out of stock'
      : 'in stock';
});

export const productModel = model<TProduct>('product', productSchema);
