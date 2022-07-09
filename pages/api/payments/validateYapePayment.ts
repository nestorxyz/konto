// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';
import userJoinValidating from 'request/prisma/userGroups/userJoinValidating';

const validateYapePayment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, groupId } = req.body;

  try {
    const user = await getUserInfo(userId);
    const group = await getGroup({ groupId });

    if (!user || !group) {
      res.status(200).json({ error: 'No existe este grupo' });
      return;
    }

    if (userId === group?.admin.id) {
      res
        .status(200)
        .json({ error: 'No puedes unirte a un grupo que tú creaste' });
      return;
    }

    if (group?.userGroups.some((userGroup) => userGroup.user.id === userId)) {
      res.status(200).json({ error: 'Ya estás en este grupo' });
      return;
    }

    if (group!.userGroups.length >= group!.plan.maxUsers) {
      res.status(200).json({ error: 'El grupo está lleno' });
      return;
    }

    const response = await userJoinValidating({ userId, groupId });

    if (response) {
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

      sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
      await sgMail.send(msg);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('validateYapePayment Error:', error);

    res.status(500).json({ error });
  }
};

export default validateYapePayment;
