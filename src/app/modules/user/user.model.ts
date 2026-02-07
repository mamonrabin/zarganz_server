import { model, Schema } from 'mongoose';
import type { TUser } from './user.interface.js';
import bcrypt from 'bcrypt';
import config from '../../config/index.js';
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /.+@.+\.com$/,
        'Please enter a valid email address with @ and .com',
      ],
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      match: [
        /^01\d{9}$/,
        'Phone number must be 11 digits and start with "01"',
      ],
    },
    image: { type: String },
    address: { type: String },
    bio: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },

    resetPasswordCode: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
});

export const userModel = model<TUser>('user', userSchema);
