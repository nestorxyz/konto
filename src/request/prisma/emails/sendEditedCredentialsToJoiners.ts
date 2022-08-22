// Libraries
import sgMail from '@sendgrid/mail';

// Request
import getGroup from 'request/prisma/groups/getGroup';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

const sendEditedCredentialsToJoiner = async (groupId: string) => {
  const group = await getGroup(groupId);

  if (!group) {
    return { error: 'No existe este grupo' };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  await Promise.all(
    group.subscriptions.map((subscription) => {
      const msg = {
        to: subscription.user.email as string, // Change to your recipient
        from: 'nmamanipantoja@gmail.com', // Change to your verified sender
        subject: `Se han cambiado las credenciales de tu grupo de ${group.plan.service.name}!`,
        html: emailFormat({
          title: `Se han cambiado las credenciales de tu grupo de ${group.plan.service.name}!`,
          body: `Mira ya las nuevas credenciales de acceso.`,
          ctaText: 'Ver credenciales',
          ctaLink: 'https://kontope.com/login?redirect=groups',
          ctaType: 'button',
        }),
      };

      return sgMail.send(msg);
    })
  );
};

export default sendEditedCredentialsToJoiner;
