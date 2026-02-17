import { model, Schema } from 'mongoose';
import type { TBanner } from './banner.interface.js';

const bannerSchema = new Schema<TBanner>(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String, default: '', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory' },
    brand: { type: Schema.Types.ObjectId, ref: 'brand' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    bannertype: {
      type: String,
      enum: ['main', 'offer', 'promotion'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const bannerModel = model<TBanner>('banner', bannerSchema);
