import express from 'express';
import { reviewController } from './review.controller.js';

const router = express.Router();

router.post('/create-review', reviewController.createReview);
router.get('/', reviewController.getAllReview);
router.get('/pagination', reviewController.getAllReviewByPagination);
router.get('/:id', reviewController.getSingleReview);
router.get('/reviewSlug/:slug', reviewController.getSingleReviewBySlug);
// router.get('/slugTask/:slug', taskController.getSingleTaskBySlug);

router.delete('/:id', reviewController.deleteSingleReview);

export const reviewRoutes = router;
