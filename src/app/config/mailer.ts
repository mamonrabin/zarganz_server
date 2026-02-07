import nodemailer from 'nodemailer';
import config from './index.js';


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email_user,
    pass: config.email_pass,
  },
});