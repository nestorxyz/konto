// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

const sendWelcomeEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;

  try {
    const user = await getUserInfo(userId);

    if (!user) {
      res.status(200).json({ error: 'No existe este usuario' });
      return;
    }

    const msg = {
      to: user.email as string, // Change to your recipient
      from: 'nmamanipantoja@gmail.com', // Change to your verified sender
      subject: 'Bienvenido a Konto!!! Qué compartirás hoy?',
      html: emailFormat({
        title: 'Bienvenido a Konto!!! Qué compartirás hoy?',
        body: 'Ya puedes comprar en grupo tus suscripciones favoritas. En el siguiente enlace podrás encontrar grupos para tí ✨.',
        ctaText: 'Ver grupos',
        ctaLink: 'https://kontope.com/login',
        ctaType: 'button',
      }),
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    await sgMail.send(msg);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('sendWelcomeEmail Error:', error);

    res.status(500).json({ error });
  }
};

export default sendWelcomeEmail;
