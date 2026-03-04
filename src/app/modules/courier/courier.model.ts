import { model, Schema } from "mongoose";
import type { TCourier } from "./courier.interface.js";

const courierSchema = new Schema<TCourier>(
    {
    courierMethod: {
      type: String,
      enum: ["STEADFAST", "PATHAO", "BKASH","NOGHAD"],
      default: "STEADFAST",
    },
    baseUrl: {
      type: String,
    },
    userName: {
      type: String,
    },
    apiKey: {
      type: String,
    },
    secretKey: {
      type: String,
    },
    clientKey: {
      type: String,
    },
    clientId: {
      type: String,
    },
    clientSecret: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    grantType: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export const courierModel = model<TCourier>('courier',courierSchema)