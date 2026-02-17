import { Router } from 'express';
import { categoryRoutes } from '../app/modules/category/category.route.js';
import { subCategoryRoutes } from '../app/modules/subCategory/subCategory.route.js';
import { productRoutes } from '../app/modules/product/product.route.js';
import { brandRoutes } from '../app/modules/brand/brand.route.js';
import { userRoutes } from '../app/modules/user/user.route.js';
import { authRoutes } from '../app/modules/auth/auth.route.js';
import { bannerRoutes } from '../app/modules/banner/banner.route.js';
import { cartRoutes } from '../app/modules/cart/cart.route.js';
import { orderRoutes } from '../app/modules/order/order.route.js';
import { contactRoutes } from '../app/modules/contact/contact.route.js';
import { privacyRoutes } from '../app/modules/privacy/privacy.route.js';
import { conditionsRoutes } from '../app/modules/conditions/conditions.route.js';
import { returnRoutes } from '../app/modules/return/return.route.js';
import { orderPolicyRoutes } from '../app/modules/orderPolicy/orderPolicy.route.js';
import { socialRoutes } from '../app/modules/social/social.route.js';
import { couponRoutes } from '../app/modules/coupon/coupon.route.js';
import { wishlistRoutes } from '../app/modules/wishlist/wishlist.route.js';
import { campaignRoutes } from '../app/modules/campaign/campaign.route.js';


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
  {
    path: '/banner',
    route: bannerRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/cart',
    route: cartRoutes,
  },
  {
    path: '/wishlist',
    route: wishlistRoutes,
  },
  {
    path: '/contact',
    route: contactRoutes,
  },
  {
    path: '/privacy',
    route: privacyRoutes,
  },
  {
    path: '/conditions',
    route: conditionsRoutes,
  },
  {
    path: '/return',
    route: returnRoutes,
  },
  {
    path: '/order-policy',
    route: orderPolicyRoutes,
  },
  {
    path: '/social',
    route: socialRoutes,
  },
  {
    path: '/coupon',
    route: couponRoutes,
  },
  {
    path: '/campaign',
    route: campaignRoutes,
  },
 
];

modulRouter.forEach((route) => rounter.use(route.path, route.route));

export default rounter;