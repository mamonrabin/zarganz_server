import { model, Schema, type HydratedDocument } from "mongoose";
import SlugUtils from "../../../utilities/slug.utils.js";
import type { TSubCategory } from "./subCategory.interface.js";


const { generateSlug } = SlugUtils;
const subCategorySchema = new Schema<TSubCategory>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    title: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

subCategorySchema.pre('save', function () {
  const subCategory = this as HydratedDocument<TSubCategory>;
  if (
    (subCategory.isModified('title') || subCategory.isNew) &&
    subCategory.title
  ) {
    try {
      subCategory.slug = generateSlug(subCategory?.title as string);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
});

export const subCategoryModel = model<TSubCategory>(
  'subCategory',
  subCategorySchema,
);