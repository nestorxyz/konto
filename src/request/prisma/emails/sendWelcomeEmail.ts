// Libraries
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

const sendWelcomeEmail = async (userId: string) => {
  const user = await getUserInfo(userId);

  if (!user) {
    return { error: 'No existe este usuario' };
  }

  const msg = {
    to: user.email as string, // Change to your recipient
    from: 'nmamanipantoja@gmail.com', // Change to your verified sender
    subject: 'Bienvenido a Konto !!! Qué compartirás hoy?',
    html: emailFormat({
      title: 'Bienvenido a Konto !!! Qué compartirás hoy?',
      body: 'Ya puedes comprar en grupo tus suscripciones favoritas. En el siguiente enlace podrás encontrar grupos para tí ✨.',
      ctaText: 'Ver grupos',
      ctaLink: 'https://kontope.com/login',
      ctaType: 'button',
    }),
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  await sgMail.send(msg);
};

export default sendWelcomeEmail;
