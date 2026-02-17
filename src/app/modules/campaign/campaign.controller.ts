/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from 'express';
import { campaignService } from './campaign.service.js';


const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const campaign = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const file = req.file as any;

    const campaignData = {
      ...campaign,
      image: file.path, // Cloudinary URL
    };

    const result = await campaignService.createCampaignByDB(campaignData);
    res.status(200).json({
      success: true,
      message: 'Campaign created successfully',
      data: result,
    });
  } catch (error) {
    
    next(error);
  }
};

const getAllCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await campaignService.getAllCampaignByDB();
    res.status(200).json({
      success: true,
      message: 'all campaign get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await campaignService.getSingleCampaignByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'get sinngle campaign successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData: any = { ...req.body };

    if (req.file) {
      const file = req.file as any;
      updateData.image = file.path; // new Cloudinary image
    }
    const result = await campaignService.updateSingleCampaignByDB(
      id as string,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'update sinngle campaign successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

const deleteSingleCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await campaignService.deleteSingleCampaignByDB(id as string);
    res.status(200).json({
      success: true,
      message: 'delete sinngle campaign successfully',
      data: result,
    });
  } catch (error) {
    // using global error handler
    next(error);
  }
};

export const campaignController = {
  createCampaign,
  getAllCampaign,
  getSingleCampaign,
  updateSingleCampaign,
  deleteSingleCampaign,
};
