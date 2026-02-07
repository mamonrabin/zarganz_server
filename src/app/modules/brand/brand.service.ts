import type { TBrand } from "./brand.interface.js";
import { brandModel } from "./brand.model.js";


const createBrandByBD = async (brand: TBrand) => {
  const result = await brandModel.create(brand);
  return result;
};
const getAllBrandByBD = async () => {
  const result = await brandModel.find();
  return result;
};
const getSingleBrandByBD = async (id: string) => {
  const result = await brandModel.findById(id);
  return result;
};

const getSingleBrandBySlug = async (slug: string) => {
  const result = await brandModel.findOne({ slug });
  return result;
};

const updateSingleBrandByBD = async (id: string, updateBrand: TBrand) => {
  const result = await brandModel.findByIdAndUpdate(id, updateBrand, {
    new: true,
  });
  return result;
};

const deleteSingleBrandByBD = async (id: string) => {
  const result = await brandModel.findByIdAndDelete(id);
  return result;
};

export const brandService = {
  createBrandByBD,
  getAllBrandByBD,
  getSingleBrandByBD,
  getSingleBrandBySlug,
  updateSingleBrandByBD,
  deleteSingleBrandByBD,
};