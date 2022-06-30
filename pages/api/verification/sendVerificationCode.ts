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
      'https://graph.facebook.com/v13.0/112374838181660/messages',
      {
        messaging_product: 'whatsapp',
        to: user?.phone,
        text: {
          body: `Bienvenido a Konto 🥳!!! Aquí tienes tu código de verificación: ${response}`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );

    console.log(message);

    res.status(200).json('message');
  } catch (error) {
    console.error('sendVerificationCode Error:', error);

    res.status(500).json({ error });
  }
};

export default sendVerificationCode;
