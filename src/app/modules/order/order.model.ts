import { model, Schema } from 'mongoose';
import type { TOrder } from './order.interface.js';
import orderIdGenerate from '../../../utilities/orderIdGenerate.js';


const orderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isGuestOrder: {
      type: Boolean,
      default: true,
    },

    products: [
      {
        productRef: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: { type: Number, required: true },
        // color: { type: String },
        // size: { type: String },
      },
    ],

    /* ---------- Pricing ---------- */
    subTotalPrice: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    // tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    // currency: {
    //   type: String,
    //   enum: ['BDT', 'USD', 'EUR'],
    //   default: 'BDT',
    // },

    couponRef: {
      type: Schema.Types.ObjectId,
      ref: 'coupon',
    },

    /* ---------- Payment ---------- */
    payment: {
      method: {
        type: String,
        enum: ['COD', 'BKASH', 'CARD'],
        default: 'COD',
      },
      transactionId: { type: String },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        default: 'Pending',
      },
      paidAt: { type: Date },
    },

    /* ---------- Customer ---------- */
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },

    /* ---------- Address ---------- */
    city: { type: String, required: true },
    address: { type: String, required: true },
    house: { type: String },
    road: { type: String },
    thana: { type: String },
    postalCode: { type: String },

    /* ---------- Order Status ---------- */
    status: {
      type: String,
      enum: [
        'OrderPlaced',
        'Confirmed',
        'Shipped',
        'Delivered',
        'Cancelled',
        'Hold',
        'InReview',
      ],
      default: 'OrderPlaced',
      index: true,
    },
    /* ---------- Delivery ---------- */
    deliveryInfo: {
      courierName: { type: String },
      trackingNumber: { type: String },
      estimatedDeliveryDate: { type: Date },
      deliveredAt: { type: Date },
    },

    /* ---------- Other ---------- */
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

/* ---------- Generate Order ID ---------- */
orderSchema.pre('save', function () {
  if (!this.orderId) {
    this.orderId = orderIdGenerate('ORD-');
  }
 
});

export const orderModel = model<TOrder>('order', orderSchema);
