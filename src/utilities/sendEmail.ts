import { transporter } from "../app/config/mailer.js";


type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  await transporter.sendMail({
    to,
    subject,
    html,
  });
};
