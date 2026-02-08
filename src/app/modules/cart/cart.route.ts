import express from 'express';
import { cartController } from './cart.controller.js';

const router = express.Router();

router.post('/create-cart', cartController.createCart);

router.get('/user/:userId', cartController.getAllCartByUser);

router.get('/:id', cartController.getSingleCart);

router.put('/:id', cartController.updateSingleCart);

router.delete('/:id', cartController.deleteSingleCart);

router.delete('/user/clear/:userId', cartController.clearCartByUser);

export const cartRoutes = router;
