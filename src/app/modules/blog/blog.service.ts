/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from "../../../utilities/buildAggregatePipeline.js";
import { getPaginationOptions } from "../../../utilities/pagination.js";
import { QueryBuilder } from "../../../utilities/QueryBuilder.js";
import { getSortOptions } from "../../../utilities/sort.js";
import type { TBlog } from "./blog.interface.js";
import { blogModel } from "./blog.model.js";

const queryBlog = async (pipeline: any[]) => {
  return await blogModel.aggregate(pipeline);
};

const createBlogByDB = async (blog: TBlog) => {
  const result = await blogModel.create(blog);
  return result;
};
const getAllBlogByDB = async () => {
  const result = await blogModel.find();
  return result;
};

const getAllBlogByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryBlog(pipeline);

  const total = await blogModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
};


const getSingleBlogByDB = async (id: string) => {
  const result = await blogModel.findById(id);
  return result;
};

const getSingleBlogBySlug = async (slug: string) => {
  const result = await blogModel.findOne({ slug });
  return result;
};

// const updateSingleBlogByDB = async (id: string, updateBlog: TBlog) => {
//   const result = await blogModel.findByIdAndUpdate(id, updateBlog, {
//     new: true,
//   });
//   return result;
// };


const updateSingleBlogByDB = async (
  id: string,
  updateBlog: Partial<TBlog>,
) => {
  const result = await blogModel.findByIdAndUpdate(id, updateBlog, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleBlogByDB = async (id: string) => {
  const result = await blogModel.findByIdAndDelete(id);
  return result;
};

export const blogService = {
  createBlogByDB,
  getAllBlogByDB,
  getAllBlogByPagination,
  getSingleBlogByDB,
  getSingleBlogBySlug,
  updateSingleBlogByDB,
  deleteSingleBlogByDB,
};