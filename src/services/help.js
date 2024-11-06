import { env } from '../utils/env.js';
import { SMTP } from '../constants/index.js';
import { sendEmail } from '../utils/sendMail.js';

export const requestNeedHelp = async (email, message) => {
  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: 'yuriwork26@gmail.com',
    subject: 'HELP MESSAGE',
    text: `Message from ${email}: '${message}'`,
  });
};
