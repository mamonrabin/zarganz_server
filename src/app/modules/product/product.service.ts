/* eslint-disable @typescript-eslint/no-explicit-any */


import { buildAggregatePipeline } from '../../../utilities/buildAggregatePipeline.js';
import { getPaginationOptions } from '../../../utilities/pagination.js';
import { QueryBuilder } from '../../../utilities/QueryBuilder.js';
import { getSortOptions } from '../../../utilities/sort.js';
import type { TProduct } from './product.interface.js';
import { productModel } from './product.model.js';


const defaultPopulate = [
  { path: 'category' },
  { path: 'subCategory',populate: { path: 'category' } },
  { path: 'brand' },
  // { path: 'colors', populate: { path: 'size' } },
];



/* ---------- Generic Query Products ---------- */

const queryProducts = async (pipeline: any[]) => {
  const docs = await productModel.aggregate(pipeline);
  return await productModel.populate(docs, defaultPopulate);
};

/* ---------- Create Product ---------- */
const createProductByBD = async (product: TProduct) => {
  return await productModel.create(product);
};

/* ---------- Get All Products ---------- */
const getAllProductByBD = async () => {
  return await productModel.find().populate(defaultPopulate).lean();
};

/* ---------- Get Paginated Products ---------- */
const getAllProductByBDWithPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, { [sortField]: sortOrder });
  const data = await queryProducts(pipeline);
  const total = await productModel.countDocuments(await QueryBuilder(query));

  return { data, meta: { total, page, limit } };
};

/* ---------- Best Sellers ---------- */
const getBestSellerProducts = async (limit = 6) => {
  const pipeline = [
    { $match: { soldQuantity: { $gt: 0 } } },
    { $sort: { soldQuantity: -1 } },
    { $limit: limit },
  ];

  const products = await queryProducts(pipeline);

  if (products.length >= limit) return products;

  // Fill remaining with latest products
  const needed = limit - products.length;
  const additional = await queryProducts([
    { $match: { _id: { $nin: products.map(p => p._id) } } },
    { $sort: { createdAt: -1 } },
    { $limit: needed },
  ]);

  return [...products, ...additional];
};

/* ---------- New Arrivals ---------- */
const getNewArrivalProducts = async (limit = 8) => {
  return await queryProducts([{ $sort: { createdAt: -1 } }, { $limit: limit }]);
};

/* ---------- Discounted Products ---------- */
const getDiscountProducts = async (limit = 8) => {
  return await queryProducts([
    { $match: { discount: { $gt: 0 } } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
  ]);
};

/* ---------- Trending Products ---------- */
const getTrendingProducts = async (limit = 6) => {
  return await queryProducts([
    { $match: { labels: 'Trending' } },
    { $sort: { createdAt: -1 } },
    { $limit: limit },
  ]);
};

/* ---------- Related Products ---------- */
const getRelatedProducts = async (productId: string, limit = 8) => {
  const product = await productModel.findById(productId);
  if (!product) return [];

  return await queryProducts([
    { $match: { _id: { $ne: product._id }, $or: [{ category: product.category }, { brand: product.brand }] } },
    { $limit: limit },
  ]);
};

const getRelatedProductsBySlug = async (slug: string, limit = 8) => {
  const product = await productModel.findOne({ slug });
  if (!product) return [];

  return await queryProducts([
    { $match: { _id: { $ne: product._id }, $or: [{ category: product.category }, { brand: product.brand }] } },
    { $limit: limit },
  ]);
};

/* ---------- Single Product ---------- */
const getSingleProductByBD = async (id: string) => {
  return await productModel.findById(id).populate(defaultPopulate).lean();
};

const getSingleProductBySlug = async (slug: string) => {
  return await productModel.findOne({ slug }).populate(defaultPopulate).lean();
};

/* ---------- Update / Delete ---------- */
const updateSingleProductByBD = async (id: string, updateProduct: TProduct) => {
  return await productModel.findByIdAndUpdate(id, updateProduct, { new: true }).populate(defaultPopulate);
};

const deleteSingleProductByBD = async (id: string) => {
  return await productModel.findByIdAndDelete(id);
};

/* ---------- Export Service ---------- */
export const productService = {
  createProductByBD,
  getAllProductByBD,
  getAllProductByBDWithPagination,
  getSingleProductByBD,
  getSingleProductBySlug,
  updateSingleProductByBD,
  deleteSingleProductByBD,
  getNewArrivalProducts,
  getDiscountProducts,
  getBestSellerProducts,
  getTrendingProducts,
  getRelatedProducts,
  getRelatedProductsBySlug,
};
