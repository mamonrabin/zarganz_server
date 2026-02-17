import express from 'express';
import { upload } from '../../config/multer.js';
import { campaignController } from './campaign.controller.js';


const router = express.Router();

router.post(
  '/create-campaign',
  upload.single('image'),
  campaignController.createCampaign,
);
router.get('/', campaignController.getAllCampaign);
router.get('/:id', campaignController.getSingleCampaign);
router.put('/:id', campaignController.updateSingleCampaign);
router.delete('/:id', campaignController.deleteSingleCampaign);

export const campaignRoutes = router;