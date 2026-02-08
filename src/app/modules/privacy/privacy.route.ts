import express from 'express';
import { privacyController } from './privacy.controller.js';

const router = express.Router();

router.post('/create-privacy', privacyController.createPrivacy);

router.get('/', privacyController.getPrivacy);

router.put('/:id', privacyController.updatePrivacy);

router.delete('/:id', privacyController.deletePrivacy);

export const privacyRoutes = router;
