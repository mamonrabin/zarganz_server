import type { ObjectId } from 'mongoose';

export type TOrderProduct = {
  productRef: ObjectId;
  quantity: number;
};

export type TPaymentInfo = {
  method: 'COD' | 'BKASH' | 'CARD';
  transactionId?: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paidAt?: Date;
};

export type TDeliveryInfo = {
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  deliveredAt?: Date;
};

export type TOrder = {
  orderId: string;
  userRef?: ObjectId;
  isGuestOrder: boolean;

  products: TOrderProduct[];

  /* ---------- Pricing ---------- */
  subTotalPrice: number;
  discountAmount?: number;
//   tax?: number;
  shippingCost: number;
  totalPrice: number;
//   currency: 'BDT' | 'USD' | 'EUR';

  couponRef?: ObjectId;

  payment: TPaymentInfo;

  name: string;
  phone: string;
  email?: string;

  city: string;
  address: string;
  house?: string;
  road?: string;
  thana?: string;
  postalCode?: string;

  status:
    | 'OrderPlaced'
    | 'Confirmed'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled'
    | 'Hold'
    | 'InReview';

  deliveryInfo?: TDeliveryInfo;

  note?: string;
  createdAt: Date;
  updatedAt: Date;
};
