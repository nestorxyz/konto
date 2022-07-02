// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getPlan from 'request/prisma/plans/getPlan';

const validateYapePayment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, planId } = req.body;

  try {
    const user = await getUserInfo(userId);
    const plan = await getPlan(planId);

    const msg = {
      to: 'nmamanipantoja@gmail.com', // Change to your recipient
      from: 'nmamanipantoja@gmail.com', // Change to your verified sender
      subject: 'VALIDA EL PAGO CON YAPE MI KING',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<strong>Usuario: </strong> ${user!.name}<br>
      <strong>Id del usuario: </strong> ${user!.id}<br>
      <strong>Número del usuario: </strong> ${user!.phone}<br>
      <strong>Plan: </strong> ${plan!.service.name}<br>
      <strong>Precio: </strong> ${plan!.joinerPay}<br>
      `,
    };

    await sgMail.send(msg);

    res.status(200);
  } catch (error) {
    console.error('validateYapePayment Error:', error);

    res.status(500).json({ error });
  }
};

/* 
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
*/

export default validateYapePayment;
