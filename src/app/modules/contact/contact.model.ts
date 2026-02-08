import { model, Schema } from "mongoose";
import type { TContact } from "./contact.interface.js";



const contactSchema = new Schema<TContact>(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  },
);



export const contactModel = model<TContact>('contact', contactSchema);