import type { TCategory } from "./category.interface.js";
import { categoryModel } from "./category.model.js";

const createCategoryByDB = async (category: TCategory) => {
  const result = await categoryModel.create(category);
  return result;
};
const getAllCategoryByDB = async () => {
  const result = await categoryModel.find();
  return result;
};
const getSingleCategoryByDB = async (id: string) => {
  const result = await categoryModel.findById(id);
  return result;
};

const getSingleCategoryBySlug = async (slug: string) => {
  const result = await categoryModel.findOne({ slug });
  return result;
};

const updateSingleCategoryByDB = async (
  id: string,
  updateCategory: TCategory,
) => {
  const result = await categoryModel.findByIdAndUpdate(id, updateCategory, {
    new: true,
  });
  return result;
};

const deleteSingleCategoryByDB = async (id: string) => {
  const result = await categoryModel.findByIdAndDelete(id);
  return result;
};

export const categoryService = {
  createCategoryByDB,
  getAllCategoryByDB,
  getSingleCategoryByDB,
  getSingleCategoryBySlug,
  updateSingleCategoryByDB,
  deleteSingleCategoryByDB,
};