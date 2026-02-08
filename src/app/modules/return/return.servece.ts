
import type { TReturns } from "./Return.interface.js";
import { returnModel } from "./return.model.js";

/* ---------- Create Return ---------- */
const createReturnByDB = async (returns: TReturns) => {
  const result = await returnModel.create(returns);
  return result;
};


const getReturnByDB = async () => {
  const result = await returnModel.findOne(); 
  return result;
};


const getSingleReturnByDB = async (id: string) => {
  const result = await returnModel.findById(id);
  return result;
};


const updateReturnByDB = async (id: string, updateReturn: Partial<TReturns>) => {
  const result = await returnModel.findByIdAndUpdate(id, updateReturn, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deleteReturnByDB = async (id: string) => {
  const result = await returnModel.findByIdAndDelete(id);
  return result;
};

export const returnService = {
  createReturnByDB,
  getReturnByDB,
  getSingleReturnByDB,
  updateReturnByDB,
  deleteReturnByDB,
};
