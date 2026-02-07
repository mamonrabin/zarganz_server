import { model, Schema, type HydratedDocument } from 'mongoose';
import type { TBrand } from './brand.interface.js';
import SlugUtils from '../../../utilities/slug.utils.js';
const { generateSlug } = SlugUtils;

const brandSchema = new Schema<TBrand>(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    image: { type: String, default: '', required: true },
  },
  {
    timestamps: true,
  },
);

brandSchema.pre('save', function () {
  const brand = this as HydratedDocument<TBrand>;
  if ((brand.isModified('title') || brand.isNew) && brand.title) {
    brand.slug = generateSlug(brand?.title as string);
  }
});

export const brandModel = model<TBrand>('brand', brandSchema);
 