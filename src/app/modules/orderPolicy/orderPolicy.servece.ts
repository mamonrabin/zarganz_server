import type { TOrderPolicy } from "./orderPolicy.interface.js";
import { orderPolicyModel } from "./orderPolicy.model.js";

/* ---------- Create OrderPolicy ---------- */
const createOrderPolicyByDB = async (orderPolicy: TOrderPolicy) => {
  const result = await orderPolicyModel.create(orderPolicy);
  return result;
};


const getOrderPolicyByDB = async () => {
  const result = await orderPolicyModel.findOne(); 
  return result;
};


const getSingleOrderPolicyByDB = async (id: string) => {
  const result = await orderPolicyModel.findById(id);
  return result;
};


const updateOrderPolicyByDB = async (id: string, updateOrderPolicy: Partial<TOrderPolicy>) => {
  const result = await orderPolicyModel.findByIdAndUpdate(id, updateOrderPolicy, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deleteOrderPolicyByDB = async (id: string) => {
  const result = await orderPolicyModel.findByIdAndDelete(id);
  return result;
};

export const orderPolicyService = {
  createOrderPolicyByDB,
  getOrderPolicyByDB,
  getSingleOrderPolicyByDB,
  updateOrderPolicyByDB,
  deleteOrderPolicyByDB,
};
