// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';

// Helpers
import { emailFormat } from 'lib/email/emailFormat';

const sendGroupCreatedEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, groupId } = req.body;

  try {
    const user = await getUserInfo(userId);
    const group = await getGroup(groupId);

    if (!user) {
      res.status(200).json({ error: 'No existe este usuario' });
      return;
    }

    if (!group) {
      res.status(200).json({ error: 'No existe este grupo' });
      return;
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

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('sendGroupCreatedEmail Error:', error);

    res.status(500).json({ error });
  }
};

export default sendGroupCreatedEmail;
