import express from 'express';
import { courierController } from './courier.controller.js';



const router = express.Router();

router.post(
  '/create-courier',
  courierController.createCourier,
);
router.get('/', courierController.getAllCourier);
router.get('/:id', courierController.getSingleCourier);
router.put('/:id', courierController.updateSingleCourier);
router.delete('/:id', courierController.deleteSingleCourier);

export const courierRoutes = router;