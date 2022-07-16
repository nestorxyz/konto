// Libraries
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

interface IAxiosSendGroupCreatedEmailProps {
  userId: string;
  groupId: string;
}

const sendGroupCreatedEmail = async (
  props: IAxiosSendGroupCreatedEmailProps
) => {
  const user = await getUserInfo(props.userId);
  const group = await getGroup(props.groupId);

  if (!user) {
    return { error: 'No existe este usuario' };
  }

  if (!group) {
    return { error: 'No existe este grupo' };
  }

  const msg = {
    to: user.email as string, // Change to your recipient
    from: 'nmamanipantoja@gmail.com', // Change to your verified sender
    subject: `Ya creaste tu grupo de ${group.plan.service.name} 🤘!!!`,
    html: emailFormat({
      title: 'Ya estás listo para gastar menos en tus suscripciones',
      body: `Nos emociona que compres ${group.plan.service.name} en grupo. Comparte el siguiente enlace con tu familia y amigos para que se unan a tu grupo.`,
      ctaText: `https://kontope.com/grupo/${group.id}`,
      ctaLink: `https://kontope.com/grupo/${group.id}`,
      ctaType: 'link',
    }),
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  await sgMail.send(msg);
};

export default sendGroupCreatedEmail;
