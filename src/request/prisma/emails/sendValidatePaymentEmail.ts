// Libraries
import sgMail from '@sendgrid/mail';

// Types
import { UserGroup } from 'request/prisma/subscriptions/getUserGroup';

const sendValidatePaymentEmail = async (userGroup: UserGroup) => {
  const msg = {
    to: 'nestor.mamani@unmsm.edu.pe', // Change to your recipient
    from: 'nmamanipantoja@gmail.com', // Change to your verified sender
    subject: 'VALIDA EL PAGO CON YAPE MI KING',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<strong>Usuario: </strong> ${userGroup?.user.name}<br>
      <strong>Id del usuario: </strong> ${userGroup?.user.id}<br>
      <strong>Email del usuario: </strong> ${userGroup?.user.email}<br>
      <strong>Plan: </strong> ${userGroup?.group.plan.service.name}<br>
      <strong>Precio: </strong> ${userGroup?.group.plan.joinerPay}<br>
      `,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  await sgMail.send(msg);
};

export default sendValidatePaymentEmail;
