/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildAggregatePipeline } from '../../../utilities/buildAggregatePipeline.js';
import { getPaginationOptions } from '../../../utilities/pagination.js';
import { QueryBuilder } from '../../../utilities/QueryBuilder.js';
import { getSortOptions } from '../../../utilities/sort.js';
import type { TReview } from './review.interface.js';
import { reviewModel } from './review.model.js';


/* ---------- Generic Query Products ---------- */

const queryReview = async (pipeline: any[]) => {
  return await reviewModel.aggregate(pipeline);
};

const createReviewByDB = async (review: TReview) => {
  const result = await reviewModel.create(review);
  return result;
};
const getAllReviewByDB = async () => {
  const result = await reviewModel.find();
  return result;
};
const getSingleReviewByDB = async (id: string) => {
  const result = await reviewModel.findById(id);
  return result;
};

const getAllReviewByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryReview(pipeline);

  const total = await reviewModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
};

const getSingleReviewBySlug = async (slug: string) => {
  const result = await reviewModel.findOne({ slug });
  return result;
};

// const updateSingleReviewByDB = async (
//   id: string,
//   updateReview: TReview,
// ) => {
//   const result = await reviewModel.findByIdAndUpdate(id, updateReview, {
//     new: true,
//   });
//   return result;
// };

const deleteSingleReviewByDB = async (id: string) => {
  const result = await reviewModel.findByIdAndDelete(id);
  return result;
};

export const reviewService = {
  createReviewByDB,
  getAllReviewByDB,
  getSingleReviewByDB,
  getSingleReviewBySlug,
  deleteSingleReviewByDB,
  getAllReviewByPagination,
};
