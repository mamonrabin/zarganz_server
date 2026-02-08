import express from 'express';
import { upload } from '../../config/multer.js';
import { bannerController } from './banner.controller.js';

const router = express.Router();

router.post(
  '/create-banner',
  upload.single('image'),
  bannerController.createBanner,
);
router.get('/', bannerController.getAllBanner);
router.get('/:id', bannerController.getSingleBanner);
router.put('/:id', bannerController.updateSingleBanner);
router.delete('/:id', bannerController.deleteSingleBanner);

export const bannerRoutes = router;