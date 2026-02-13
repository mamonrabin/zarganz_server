/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from "../../../utilities/buildAggregatePipeline.js";
import { getPaginationOptions } from "../../../utilities/pagination.js";
import { QueryBuilder } from "../../../utilities/QueryBuilder.js";
import { getSortOptions } from "../../../utilities/sort.js";
import type { TSubCategory } from "./subCategory.interface.js";
import { subCategoryModel } from "./subCategory.model.js";

const querySubCategory = async (pipeline: any[]) => {
  return await subCategoryModel.aggregate(pipeline);
};


const createSubCategoryByDB = async (subCategory: TSubCategory) => {
  const result = await subCategoryModel.create(subCategory);
  return result;
};
const getAllSubCategoryByDB = async () => {
  const result = await subCategoryModel.find().populate('category');
  return result;
};


const getAllSubCategoryByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await querySubCategory(pipeline);

  const total = await subCategoryModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
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
  getAllSubCategoryByPagination,
  getSingleSubCategoryByDB,
  getSingleSubCategoryBySlug,
  updateSingleSubCategoryByDB,
  deleteSingleSubCategoryByDB,
};