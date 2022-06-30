// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Request
import generatePhoneVerification from 'request/prisma/verification/GeneratePhoneVerification';
import getUserInfo from 'request/prisma/users/getUserInfo';

const token = process.env.WHATSAPP_TOKEN;

const sendVerificationCode = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId } = req.body;

  try {
    const user = await getUserInfo(userId);
    const response = await generatePhoneVerification({ userId });

    const message = await axios.post(
      'https://graph.facebook.com/v13.0/me/messages',
      {
        messaging_product: 'whatsapp',
        to: user?.phone,
        text: {
          body: `Your verification code is: ${response}`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Beare' + token,
        },
      }
    );

    console.log(message);

    res.status(200).json('message');
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default sendVerificationCode;
