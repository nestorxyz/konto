// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';

const validateYapePayment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, groupId } = req.body;

  try {
    const user = await getUserInfo(userId);
    const group = await getGroup({ groupId });

    const msg = {
      to: 'nestor.mamani@unmsm.edu.pe', // Change to your recipient
      from: 'nmamanipantoja@gmail.com', // Change to your verified sender
      subject: 'VALIDA EL PAGO CON YAPE MI KING',
      text: 'and easy to do anywhere, even with Node.js',
      html: `<strong>Usuario: </strong> ${user!.name}<br>
      <strong>Id del usuario: </strong> ${user!.id}<br>
      <strong>Número del usuario: </strong> ${user!.phone}<br>
      <strong>Plan: </strong> ${group!.plan.service.name}<br>
      <strong>Precio: </strong> ${group!.plan.joinerPay}<br>
      `,
    };

    /* sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    await sgMail.send(msg); */

    res.status(200).json({ success: true });
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
