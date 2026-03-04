import type { TCourier } from "./courier.interface.js";
import { courierModel } from "./courier.model.js";

const createCourierByDB = async (courier: TCourier) => {
  const result = await courierModel.create(courier);
  return result;
};
const getAllCourierByDB = async () => {
  const result = await courierModel.find();
  return result;
};


const getSingleCourierByDB = async (id: string) => {
  const result = await courierModel.findById(id);
  return result;
};

const updateSingleCourierByDB = async (id: string, updateCourier: TCourier) => {
  const result = await courierModel.findByIdAndUpdate(id, updateCourier, {
    new: true,
  });
  return result;
};

const deleteSingleCourierByDB = async (id: string) => {
  const result = await courierModel.findByIdAndDelete(id);
  return result;
};

export const courierService = {
  createCourierByDB,
  getAllCourierByDB,
  getSingleCourierByDB,
  updateSingleCourierByDB,
  deleteSingleCourierByDB,
};