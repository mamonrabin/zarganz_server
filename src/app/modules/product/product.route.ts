import express from 'express';
import { productController } from './product.controller.js';
import { upload } from '../../config/multer.js';

const router = express.Router();

/* ---------- Create Product ---------- */
router.post(
  '/create-product',
  upload.fields([
    { name: 'thumbal_image', maxCount: 1 },
    { name: 'backview_image', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  productController.createProduct,
);

/* ---------- Get Products ---------- */
router.get('/', productController.getAllProduct);
router.get('/fillter', productController.getAllProductByPagination);

router.get('/new-arrivals', productController.getNewArrivalProducts);
router.get('/discount-products', productController.getDiscountProducts);
router.get('/best-sellers', productController.getBestSellerProducts);
router.get('/trending-products', productController.getTrendingProducts);

/* ---------- Related ---------- */
router.get('/related/:id', productController.getReletiveProduct);
router.get('/related-by-slug/:slug', productController.getReletiveProductBySlug);

/* ---------- Single Product ---------- */
// ⚠️ more specific routes FIRST
router.get('/productSlug/:slug', productController.getSingleProductBySlug);
router.get('/:id', productController.getSingleProduct);

/* ---------- Update ---------- */
router.put(
  '/:id',
  upload.fields([
    { name: 'thumbal_image', maxCount: 1 },
    { name: 'backview_image', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  productController.updateSingleProduct,
);

/* ---------- Delete ---------- */
router.delete('/:id', productController.deleteSingleProduct);

export const productRoutes = router;
