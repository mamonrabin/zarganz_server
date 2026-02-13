/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from '../../../utilities/buildAggregatePipeline.js';
import { getPaginationOptions } from '../../../utilities/pagination.js';
import { QueryBuilder } from '../../../utilities/QueryBuilder.js';
import { getSortOptions } from '../../../utilities/sort.js';
import type { TCategory } from './category.interface.js';
import { categoryModel } from './category.model.js';

/* ---------- Generic Query Products ---------- */

const queryCategory = async (pipeline: any[]) => {
  return await categoryModel.aggregate(pipeline);
};

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

const getAllCategoryByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryCategory(pipeline);

  const total = await categoryModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
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
  getAllCategoryByPagination,
};
