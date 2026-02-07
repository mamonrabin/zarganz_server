import type { TUser } from "./user.interface.js";
import { userModel } from "./user.model.js";


const createUserByBD = async (user: TUser) => {
  const result = await userModel.create(user);
  return result;
};
const getAllUserByBD = async () => {
  const result = await userModel.find();
  return result;
};
const getSingleUserByBD = async (id: string) => {
  const result = await userModel.findById(id);
  return result;
};

const updateSingleUserByBD = async (id: string, updateUser: TUser) => {
  const result = await userModel.findByIdAndUpdate(id, updateUser, {
    new: true,
  });
  return result;
};

const deleteSingleUserByBD = async (id: string) => {
  const result = await userModel.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUserByBD,
  getAllUserByBD,
  getSingleUserByBD,
  updateSingleUserByBD,
  deleteSingleUserByBD,
};