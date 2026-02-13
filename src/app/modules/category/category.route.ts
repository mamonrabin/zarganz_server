import express from 'express';
import { categoryController } from './category.controller.js';
import { upload } from '../../config/multer.js';

const router = express.Router();

router.post('/create-category',  upload.single('image'), categoryController.createCategory);
router.get('/', categoryController.getAllCategory);
router.get('/pagination', categoryController.getAllCategoryByPagination);
router.get('/:id', categoryController.getSingleCategory);
router.get('/categorySlug/:slug', categoryController.getSingleCategoryBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.put('/:id', upload.single('image'), categoryController.updateSingleCategory);
router.delete('/:id', categoryController.deleteSingleCategory);

export const categoryRoutes = router;
