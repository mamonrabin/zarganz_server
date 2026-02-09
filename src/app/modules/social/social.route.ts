import express from 'express';
import { socialController } from './social.controller.js';

const router = express.Router();

router.post('/create-social', socialController.createSocial);

router.get('/', socialController.getSocial);

router.put('/:id', socialController.updateSocial);

router.delete('/:id', socialController.deleteSocial);

export const socialRoutes = router;
