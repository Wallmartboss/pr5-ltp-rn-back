import { requestNeedHelp } from '../services/help.js';

export const requestNeedHelpController = async (req, res) => {
  const { email, message } = req.body;

  await requestNeedHelp(email, message);
  res.json({
    message: 'Successfully send message about help',
    status: 200,
  });
};
