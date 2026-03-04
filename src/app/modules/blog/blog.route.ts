import express from 'express';
import { upload } from '../../config/multer.js';
import { blogController } from './blog.controller.js';

const router = express.Router();

router.post('/create-blog', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]), blogController.createBlog);
router.get('/', blogController.getAllBlog);
router.get('/pagination', blogController.getAllBlogByPagination);
router.get('/slug/:slug', blogController.getSingleBlogBySlug);
router.get('/:id', blogController.getSingleBlog);
router.put('/:id', blogController.updateSingleBlog);
router.delete('/:id', blogController.deleteSingleBlog);

export const blogRoutes = router;
