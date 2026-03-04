/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import type { TOrder } from './order.interface.js';
import { orderModel } from './order.model.js';
import { productModel } from '../product/product.model.js';
import { getSortOptions } from '../../../utilities/sort.js';
import { getPaginationOptions } from '../../../utilities/pagination.js';
import { buildAggregatePipeline } from '../../../utilities/buildAggregatePipeline.js';
import { QueryBuilder } from '../../../utilities/QueryBuilder.js';

const queryOrder = async (pipeline: any[]) => {
  return await orderModel.aggregate(pipeline);
};


/* ---------- Create Order ---------- */
const createOrderByBD = async (order: TOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    /* ---------- Create Order ---------- */
    const [createdOrder] = await orderModel.create([order], { session });

    /* ---------- Prepare Bulk Product Updates ---------- */
    const bulkOperations = [];

    for (const item of order.products) {
      const product = await productModel
        .findById(item.productID)
        .session(session)
        .select('quantity soldQuantity title');

      if (!product) {
        throw new Error(`Product not found: ${item.productID}`);
      }

      const available =
        product.quantity - (product.soldQuantity || 0);

      if (available < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.title}`);
      }

      bulkOperations.push({
        updateOne: {
          filter: { _id: item.productID },
          update: {
            $inc: { soldQuantity: item.quantity },
          },
        },
      });
    }

    /* ---------- Update Product Stock ---------- */
    if (bulkOperations.length) {
      await productModel.bulkWrite(bulkOperations, { session });
    }

    /* ---------- Commit ---------- */
    await session.commitTransaction();
    return createdOrder;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/* ---------- Get All Orders ---------- */
const getAllOrderByBD = async () => {
  return orderModel
    .find()
    .sort({ createdAt: -1 })
    .lean()
    .populate('products.productID', 'title price')
};

const getAllOrderByPagination = async (query: Record<string, unknown>) => {
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);
  const { skip, limit, page } = getPaginationOptions(query);

  const pipeline = await buildAggregatePipeline(query, skip, limit, {
    [sortField]: sortOrder,
  });

  const data = await queryOrder(pipeline);

  const total = await orderModel.countDocuments(await QueryBuilder(query));

  return {
    data,
    meta: { total, page, limit },
  };
};



/* ---------- Get Single Order ---------- */
const getSingleOrderByBD = async (id: string) => {
  return orderModel
    .findById(id)
    .populate('products.productID', 'title price')
    .lean();
};

/* ---------- Update Order (Partial Safe Update) ---------- */
const updateSingleOrderByBD = async (
  id: string,
  updateOrder: Partial<TOrder>,
) => {
  return orderModel.findByIdAndUpdate(id, updateOrder, {
    new: true,
    runValidators: true,
  });
};

/* ---------- Delete Order ---------- */
const deleteSingleOrderByBD = async (id: string) => {
  return orderModel.findByIdAndDelete(id);
};

export const orderService = {
  createOrderByBD,
  getAllOrderByBD,
  getAllOrderByPagination,
  getSingleOrderByBD,
  updateSingleOrderByBD,
  deleteSingleOrderByBD,
};
