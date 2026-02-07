import { Router } from 'express';
import { categoryRoutes } from '../app/modules/category/category.route.js';
import { subCategoryRoutes } from '../app/modules/subCategory/subCategory.route.js';
import { productRoutes } from '../app/modules/product/product.route.js';
import { brandRoutes } from '../app/modules/brand/brand.route.js';
import { userRoutes } from '../app/modules/user/user.route.js';
import { authRoutes } from '../app/modules/auth/auth.route.js';


const rounter = Router();

const modulRouter = [
  
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/sub-category',
    route: subCategoryRoutes,
  },
  {
    path: '/brand',
    route: brandRoutes,
  },

  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },

  {
    path: '/auth',
    route: authRoutes,
  },
 
];

modulRouter.forEach((route) => rounter.use(route.path, route.route));

export default rounter;