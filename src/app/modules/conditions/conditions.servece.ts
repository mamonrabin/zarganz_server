import type { TConditions } from "./conditions.interface.js";
import { conditionsModel } from "./conditions.model.js";

/* ---------- Create Conditions ---------- */
const createConditionsByDB = async (conditions: TConditions) => {
  const result = await conditionsModel.create(conditions);
  return result;
};


const getConditionsByDB = async () => {
  const result = await conditionsModel.findOne(); 
  return result;
};


const getSingleConditionsByDB = async (id: string) => {
  const result = await conditionsModel.findById(id);
  return result;
};


const updateConditionsByDB = async (id: string, updateConditions: Partial<TConditions>) => {
  const result = await conditionsModel.findByIdAndUpdate(id, updateConditions, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deleteConditionsByDB = async (id: string) => {
  const result = await conditionsModel.findByIdAndDelete(id);
  return result;
};

export const conditionsService = {
  createConditionsByDB,
  getConditionsByDB,
  getSingleConditionsByDB,
  updateConditionsByDB,
  deleteConditionsByDB,
};
