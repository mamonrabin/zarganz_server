import type { TCampaign } from "./campaign.interface.js";
import { campaignModel } from "./campaign.model.js";



const createCampaignByDB = async (campaign: TCampaign) => {
  const result = await campaignModel.create(campaign);
  return result;
};
const getAllCampaignByDB = async () => {
  const result = await campaignModel.find().populate('couponId');
  return result;
};
const getSingleCampaignByDB = async (id: string) => {
  const result = await campaignModel.findById(id).populate('couponId');
  return result;
};

const updateSingleCampaignByDB = async (id: string, updateCampaign: TCampaign) => {
  const result = await campaignModel.findByIdAndUpdate(id, updateCampaign, {
    new: true,
  });
  return result;
};

const deleteSingleCampaignByDB = async (id: string) => {
  const result = await campaignModel.findByIdAndDelete(id);
  return result;
};

export const campaignService = {
  createCampaignByDB,
  getAllCampaignByDB,
  getSingleCampaignByDB,
  updateSingleCampaignByDB,
  deleteSingleCampaignByDB,
};