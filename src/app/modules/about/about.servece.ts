import type { TAbout } from "./about.interface.js";
import { aboutModel } from "./about.model.js";

/* ---------- Create About ---------- */
const createAboutByDB = async (about: TAbout) => {
  const result = await aboutModel.create(about);
  return result;
};


const getAboutByDB = async () => {
  const result = await aboutModel.findOne(); 
  return result;
};


const getSingleAboutByDB = async (id: string) => {
  const result = await aboutModel.findById(id);
  return result;
};


const updateAboutByDB = async (id: string, updateAbout: Partial<TAbout>) => {
  const result = await aboutModel.findByIdAndUpdate(id, updateAbout, {
    new: true,
    runValidators: true,
  });
  return result;
};

 
const deleteAboutByDB = async (id: string) => {
  const result = await aboutModel.findByIdAndDelete(id);
  return result;
};

export const aboutService = {
  createAboutByDB,
  getAboutByDB,
  getSingleAboutByDB,
  updateAboutByDB,
  deleteAboutByDB,
};
