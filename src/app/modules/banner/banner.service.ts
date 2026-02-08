import type { TBanner } from "./banner.interface.js";
import { bannerModel } from "./banner.model.js";


const createBannerByDB = async (banner: TBanner) => {
  const result = await bannerModel.create(banner);
  return result;
};
const getAllBannerByDB = async () => {
  const result = await bannerModel.find();
  return result;
};
const getSingleBannerByDB = async (id: string) => {
  const result = await bannerModel.findById(id);
  return result;
};

const updateSingleBannerByDB = async (id: string, updateBanner: TBanner) => {
  const result = await bannerModel.findByIdAndUpdate(id, updateBanner, {
    new: true,
  });
  return result;
};

const deleteSingleBannerByDB = async (id: string) => {
  const result = await bannerModel.findByIdAndDelete(id);
  return result;
};

export const bannerService = {
  createBannerByDB,
  getAllBannerByDB,
  getSingleBannerByDB,
  updateSingleBannerByDB,
  deleteSingleBannerByDB,
};