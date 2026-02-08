import express from 'express';
import { returnsController } from './return.controller.js';


const router = express.Router();

router.post('/create-return', returnsController.createReturns);

router.get('/', returnsController.getReturns);

router.put('/:id', returnsController.updateReturns);

router.delete('/:id', returnsController.deleteReturns);

export const returnRoutes = router;
