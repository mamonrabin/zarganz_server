import { model, Schema, type HydratedDocument } from "mongoose";
import type { TCategory } from "./category.interface.js";
import SlugUtils from "../../../utilities/slug.utils.js";

const { generateSlug } = SlugUtils;
const categorySchema = new Schema<TCategory>({
    title:String,
    image:String,
    slug:String
},
{
    timestamps:true
}
)

categorySchema.pre('save', function () {
  const category = this as HydratedDocument<TCategory>;

  if ((category.isModified('title') || category.isNew) && category.title) {
    category.slug = generateSlug(category.title);
  }
});

export const categoryModel = model<TCategory>('category',categorySchema)

 