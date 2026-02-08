import express from 'express';
import { aboutController } from './about.controller.js';

const router = express.Router();

router.post('/create-about', aboutController.createAbout);

router.get('/', aboutController.getAbout);

router.put('/:id', aboutController.updateAbout);

router.delete('/:id', aboutController.deleteAbout);

export const aboutRoutes = router;
