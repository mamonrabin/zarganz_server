/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TUser } from '../user/user.interface.js';
import { userModel } from '../user/user.model.js';
import config from '../../config/index.js';
import { createToken } from '../../../utilities/jwt.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendEmail } from '../../../utilities/sendEmail.js';
/* ---------- Helpers ---------- */

const buildJwtPayload = (user: TUser) => ({
  name: user.name,
  email: user.email,
  phone: user.phone,
  image: user.image,
  status: user.status,
  role: user.role,
  bio: user.bio,
});

const getTokenExpiry = (): number =>
  Number(config.jwt_access_token_expires_in) || 60 * 60 * 24 * 10; // 10 days

/* ---------- Login ---------- */

const login = async (payload: Pick<TUser, 'email' | 'password'>) => {
  const user = await userModel
    .findOne({ email: payload.email })
    .select('+password')
    .lean();

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password as string,
    user.password as string,
  );

  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  const accessToken = createToken(
    buildJwtPayload(user),
    config.jwt_acess_token_secret as string,
    getTokenExpiry(),
  );

  // remove password before sending user data
  const { password, ...userData } = user;

  return {
    accessToken,
    userData,
  };
};

/* ---------- Signup ---------- */

const signup = async (payload: TUser) => {
  const existingUser = await userModel.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error('User already exists!');
  }

  const newUser = await userModel.create(payload);

  const accessToken = createToken(
    buildJwtPayload(newUser),
    config.jwt_acess_token_secret as string,
    getTokenExpiry(),
  );

  return {
    accessToken,
    userData: newUser,
  };
};

const forgotPassword = async (email: string) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  // generate 6 digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // hash the code
  const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

  user.resetPasswordCode = hashedCode;
  user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await user.save();

 await sendEmail({
    to: user.email,
    subject: 'Password Reset Code',
    html: `
      <h2>Password Reset Code</h2>
      <p>Your code is: <b>${code}</b></p>
      <p>This code is valid for 10 minutes.</p>
    `,
  });

  

  return true;
};

const resetPassword = async (
  email: string,
  code: string,
  newPassword: string,
) => {
  const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

  const user = await userModel.findOne({
    email,
    resetPasswordCode: hashedCode,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new Error('Invalid or expired code');
  }

  user.password = newPassword; // will hash via pre-save
  user.resetPasswordCode = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return true;
};

export const authServices = {
  login,
  signup,
  forgotPassword,
  resetPassword,
};
