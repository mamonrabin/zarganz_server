import express from 'express';
import { subCategoryController } from './subCategory.controller.js';



const router = express.Router();

router.post('/create-sub-category', subCategoryController.createSubCategory);
router.get('/', subCategoryController.getAllSubCategory);
router.get('/:id', subCategoryController.getSingleSubCategory);
router.get(
  '/subCategorySlug/:slug',
  subCategoryController.getSingleSubCategoryBySlug,
);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', subCategoryController.updateSingleSubCategory);
router.delete('/:id', subCategoryController.deleteSingleSubCategory);

export const subCategoryRoutes = router;