import express from 'express';
import { conditionsController } from './conditions.controller.js';

const router = express.Router();

router.post('/create-conditions', conditionsController.createConditions);

router.get('/', conditionsController.getConditions);

router.put('/:id', conditionsController.updateConditions);

router.delete('/:id', conditionsController.deleteConditions);

export const conditionsRoutes = router;
