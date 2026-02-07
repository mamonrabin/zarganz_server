import express from 'express';
import { userController } from './user.controller.js';
import { upload } from '../../config/multer.js';

const router = express.Router();

router.post('/create-user', upload.single('image'), userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:id', userController.getSingleUser);
router.put('/:id',upload.single('image'), userController.updateSingleUser);
router.delete('/:id', userController.deleteSingleUser);

export const userRoutes = router;