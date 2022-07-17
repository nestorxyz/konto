// Libraries
import sgMail from '@sendgrid/mail';

// Request
import getUserGroup from 'request/prisma/admin/getUserGroup';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

const sendSuccessfulPaymentEmailToJoinerNAdmin = async (
  userGroupId: string
) => {
  const userGroup = await getUserGroup(userGroupId);

  if (!userGroup) {
    return { error: 'No existe el userGroupId' };
  }

  if (userGroup?.state !== 'ACTIVE') {
    return { error: 'El pago no ha sido validado' };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  // Send email to joiner
  const joinerMsg = {
    to: userGroup.user.email as string, // Change to your recipient
    from: 'nmamanipantoja@gmail.com', // Change to your verified sender
    subject: `Ya puedes acceder a ${userGroup.group.plan.service.name}!`,
    html: emailFormat({
      title: `Ya puedes acceder a ${userGroup.group.plan.service.name}!`,
      body: `Nos emociona que compres ${userGroup.group.plan.service.name} en grupo. Tu pago fue validado con éxito, mira ya las credenciales de acceso.`,
      ctaText: 'Ver credenciales',
      ctaLink: 'https://kontope.com/login?redirect=groups',
      ctaType: 'button',
    }),
  };

  // Send email to admin
  const adminMsg = {
    to: userGroup.group.admin.email as string, // Change to your recipient
    from: 'nmamanipantoja@gmail.com', // Change to your verified sender
    subject: `Nuevo pago de S/${userGroup.group.plan.adminGet} en tu grupo de ${userGroup.group.plan.service.name}.`,
    html: emailFormat({
      title: `Recibiste un nuevo pago de S/${userGroup.group.plan.adminGet} en tu grupo de ${userGroup.group.plan.service.name}!`,
      body: `Ya estás ahorrando en ${userGroup.group.plan.service.name}. Un integrante de tu grupo hizo el pago de S/${userGroup.group.plan.adminGet}, mira tus próximos pagos en la wallet de Konto.`,
      ctaText: 'Ir a Wallet',
      ctaLink: 'https://kontope.com/login?redirect=wallet',
      ctaType: 'button',
    }),
  };

  await Promise.all([sgMail.send(joinerMsg), sgMail.send(adminMsg)]);
};

export default sendSuccessfulPaymentEmailToJoinerNAdmin;
