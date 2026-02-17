import express from 'express';


import { brandController } from './brand.controller.js';
import { upload } from '../../config/multer.js';


const router = express.Router();

router.post(
  '/create-brand',
  upload.single('image'),
  brandController.createBrand,
);
router.get('/', brandController.getAllBrand);
router.get('/pagination', brandController.getAllBrandByPagination);
router.get('/:id', brandController.getSingleBrand);
router.get('/brandSlug/:slug', brandController.getSingleBrandBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', upload.single('image'), brandController.updateSingleBrand);

router.delete('/:id', brandController.deleteSingleBrand);

export const brandRoutes = router;