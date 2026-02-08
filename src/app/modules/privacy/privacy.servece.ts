import type { TPrivacy } from "./privacy.interface.js";
import { privacyModel } from "./privacy.model.js";

/* ---------- Create Privacy ---------- */
const createPrivacyByDB = async (privacy: TPrivacy) => {
  const result = await privacyModel.create(privacy);
  return result;
};


const getPrivacyByDB = async () => {
  const result = await privacyModel.findOne(); 
  return result;
};


const getSinglePrivacyByDB = async (id: string) => {
  const result = await privacyModel.findById(id);
  return result;
};


const updatePrivacyByDB = async (id: string, updatePrivacy: Partial<TPrivacy>) => {
  const result = await privacyModel.findByIdAndUpdate(id, updatePrivacy, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deletePrivacyByDB = async (id: string) => {
  const result = await privacyModel.findByIdAndDelete(id);
  return result;
};

export const privacyService = {
  createPrivacyByDB,
  getPrivacyByDB,
  getSinglePrivacyByDB,
  updatePrivacyByDB,
  deletePrivacyByDB,
};
