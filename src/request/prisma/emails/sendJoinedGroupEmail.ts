// Libraries
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

interface ISendJoinedGroupEmailProps {
  userId: string;
  groupId: string;
  userGroupId?: string;
}

const sendJoinedGroupEmail = async (props: ISendJoinedGroupEmailProps) => {
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
    subject: `Estás cerca de acceder a ${group.plan.service.name} 🤘!!!`,
    html: emailFormat({
      title: `Estás cerca de acceder a ${group.plan.service.name} 🤘!!!`,
      body: `Nos emociona que compres ${group.plan.service.name} en grupo. Te informaremos cuando validemos tu pago 😉. Si aún no realizaste el pago, yapea al 989009435.`,
      ctaText: `Ya hice el pago`,
      ctaLink: `https://kontope.com/pay/${props.userGroupId}`,
      ctaType: 'button',
    }),
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  await sgMail.send(msg);
};

export default sendJoinedGroupEmail;
