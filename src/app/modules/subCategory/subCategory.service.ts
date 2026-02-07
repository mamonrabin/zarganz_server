import type { TSubCategory } from "./subCategory.interface.js";
import { subCategoryModel } from "./subCategory.model.js";


const createSubCategoryByDB = async (subCategory: TSubCategory) => {
  const result = await subCategoryModel.create(subCategory);
  return result;
};
const getAllSubCategoryByDB = async () => {
  const result = await subCategoryModel.find().populate('category');
  return result;
};
const getSingleSubCategoryByDB = async (id: string) => {
  const result = await subCategoryModel.findById(id).populate('category');
  return result;
};

const getSingleSubCategoryBySlug = async (slug: string) => {
  const result = await subCategoryModel.findOne({ slug }).populate('category');
  return result;
};

const updateSingleSubCategoryByDB = async (
  id: string,
  updateCategory: TSubCategory,
) => {
  const result = await subCategoryModel.findByIdAndUpdate(id, updateCategory, {
    new: true,
  });
  return result;
};

const deleteSingleSubCategoryByDB = async (id: string) => {
  const result = await subCategoryModel.findByIdAndDelete(id);
  return result;
};

export const subCategoryService = {
  createSubCategoryByDB,
  getAllSubCategoryByDB,
  getSingleSubCategoryByDB,
  getSingleSubCategoryBySlug,
  updateSingleSubCategoryByDB,
  deleteSingleSubCategoryByDB,
};