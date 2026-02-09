import express from 'express';
import { wishlistController } from './wishlist.controller.js';

const router = express.Router();

router.post('/create', wishlistController.createWishlist);

router.get('/', wishlistController.getAllWishlist);

router.get('/user/:userId', wishlistController.getWishlistByUser);

router.get('/:id', wishlistController.getSingleWishlist);

router.patch('/:id', wishlistController.updateWishlist);

router.delete('/:id', wishlistController.deleteWishlist);

export const wishlistRoutes = router;
