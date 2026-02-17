/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from "../../../utilities/buildAggregatePipeline.js";
import { getPaginationOptions } from "../../../utilities/pagination.js";
import { QueryBuilder } from "../../../utilities/QueryBuilder.js";
import { getSortOptions } from "../../../utilities/sort.js";
import type { TBrand } from "./brand.interface.js";
import { brandModel } from "./brand.model.js";


const queryBrand = async (pipeline: any[]) => {
  return await brandModel.aggregate(pipeline);
};

const createBrandByBD = async (brand: TBrand) => {
  const result = await brandModel.create(brand);
  return result;
};
const getAllBrandByBD = async () => {
  const result = await brandModel.find();
  return result;
};


const getAllBrandByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryBrand(pipeline);

  const total = await brandModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
};


const getSingleBrandByBD = async (id: string) => {
  const result = await brandModel.findById(id);
  return result;
};

const getSingleBrandBySlug = async (slug: string) => {
  const result = await brandModel.findOne({ slug });
  return result;
};

const updateSingleBrandByBD = async (id: string, updateBrand: TBrand) => {
  const result = await brandModel.findByIdAndUpdate(id, updateBrand, {
    new: true,
  });
  return result;
};

const deleteSingleBrandByBD = async (id: string) => {
  const result = await brandModel.findByIdAndDelete(id);
  return result;
};

export const brandService = {
  createBrandByBD,
  getAllBrandByBD,
  getAllBrandByPagination,
  getSingleBrandByBD,
  getSingleBrandBySlug,
  updateSingleBrandByBD,
  deleteSingleBrandByBD,
};