import express from 'express';
import { subCategoryController } from './subCategory.controller.js';
import { upload } from '../../config/multer.js';

const router = express.Router();

router.post('/create-sub-category', upload.single('image'), subCategoryController.createSubCategory);
router.get('/', subCategoryController.getAllSubCategory);
router.get('/pagination', subCategoryController.getAllSubCategoryByPagination);
router.get('/:id', subCategoryController.getSingleSubCategory);
router.get(
  '/subCategorySlug/:slug',
  subCategoryController.getSingleSubCategoryBySlug,
);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', subCategoryController.updateSingleSubCategory);
router.delete('/:id', subCategoryController.deleteSingleSubCategory);

export const subCategoryRoutes = router;
