import { QueryBuilder } from "./QueryBuilder.js";

/* ---------- Helper: build aggregate pipeline ---------- */
export const buildAggregatePipeline = async (
  query: Record<string, unknown>,
  skip = 0,
  limit = 10,
  sort: Record<string, 1 | -1> = { createdAt: -1 }
) => {
  const filters = await QueryBuilder(query);

  // ✅ Price range
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);

  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filters.price = {};
    if (!isNaN(minPrice))
      (filters.price as Record<string, number>).$gte = minPrice;
    if (!isNaN(maxPrice))
      (filters.price as Record<string, number>).$lte = maxPrice;
  }

  const pipeline = [
    // ✅ Match filters
    { $match: filters },

    // ✅ Populate Category
    {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "categoryID",
      },
    },
    { $unwind: { path: "$categoryID", preserveNullAndEmptyArrays: true } },

    // ✅ Populate SubCategory
    {
      $lookup: {
        from: "subcategories",
        localField: "subCategoryID",
        foreignField: "_id",
        as: "subCategoryID",
      },
    },
    { $unwind: { path: "$subCategoryID", preserveNullAndEmptyArrays: true } },

    // ✅ Populate Brand
    {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brandID",
      },
    },
    { $unwind: { path: "$brandID", preserveNullAndEmptyArrays: true } },

    // ✅ Sort
    { $sort: sort },

    // ✅ Pagination
    { $skip: skip },
    { $limit: limit },
  ];

  return pipeline;
};
