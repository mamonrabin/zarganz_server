import type { TSocial } from "./social.interface.js";
import { socialModel } from "./social.model.js";

/* ---------- Create Social ---------- */
const createSocialByDB = async (social: TSocial) => {
  const result = await socialModel.create(social);
  return result;
};


const getSocialByDB = async () => {
  const result = await socialModel.findOne(); 
  return result;
};


const getSingleSocialByDB = async (id: string) => {
  const result = await socialModel.findById(id);
  return result;
};


const updateSocialByDB = async (id: string, updateSocial: Partial<TSocial>) => {
  const result = await socialModel.findByIdAndUpdate(id, updateSocial, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deleteSocialByDB = async (id: string) => {
  const result = await socialModel.findByIdAndDelete(id);
  return result;
};

export const socialService = {
  createSocialByDB,
  getSocialByDB,
  getSingleSocialByDB,
  updateSocialByDB,
  deleteSocialByDB,
};
