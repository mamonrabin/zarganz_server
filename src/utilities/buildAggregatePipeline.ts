import { QueryBuilder } from "./QueryBuilder.js";

/* ---------- Helper: build aggregate pipeline ---------- */
export const buildAggregatePipeline = async (query: Record<string, unknown>, skip = 0, limit = 10, sort: Record<string, 1 | -1> = { createdAt: -1 }) => {
  const filters = await QueryBuilder(query);

  // Price range
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filters.price = {};
    if (!isNaN(minPrice)) (filters.price as Record<string, number> ).$gte = minPrice;
    if (!isNaN(maxPrice)) (filters.price as Record<string, number> ).$lte = maxPrice;
  }

  const pipeline = [
    { $match: filters },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ];

  return pipeline;
};