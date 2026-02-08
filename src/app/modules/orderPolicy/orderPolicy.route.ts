import express from 'express';
import { orderPolicyController } from './orderPolicy.controller.js';

const router = express.Router();

router.post('/create-orderPolicy', orderPolicyController.createOrderPolicy);

router.get('/', orderPolicyController.getOrderPolicy);

router.put('/:id', orderPolicyController.updateOrderPolicy);

router.delete('/:id', orderPolicyController.deleteOrderPolicy);

export const orderPolicyRoutes = router;
