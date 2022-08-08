// Libraries
import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';
import getGroup from 'request/prisma/groups/getGroup';
import getPaymentMethod from 'request/prisma/paymentMethod/getPaymentMethod';

import userDepositValidating from 'request/prisma/deposit/userDepositValidating';
import userJoinValidating from 'request/prisma/userGroups/userJoinValidating';

const validateJoinGroupPayment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, groupId, paymentMethodId } = req.body;

  try {
    const [user, group, paymentMethod] = await Promise.all([
      getUserInfo(userId),
      getGroup(groupId),
      getPaymentMethod(paymentMethodId),
    ]);

    if (!user || !group || !paymentMethod) {
      res.status(200).json({ error: 'No existe este registro' });
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

    const deposit = await userDepositValidating({
      amount: group.plan.joinerPay,
      userId,
      paymentMethodId,
    });

    const userGroup = await userJoinValidating({
      userId,
      groupId,
    });

    if (!deposit || !userGroup) {
      res.status(500).json({ error: 'Error al validar el pago' });
      return;
    }

    const msg = {
      to: 'nestoredduardo@gmail.com', // Change to your recipient
      from: 'nmamanipantoja@gmail.com', // Change to your verified sender
      subject: `VALIDA EL PAGO CON ${paymentMethod.type} MI KING`,
      text: 'Keep going little rockstar!',
      html: `<strong>Usuario: </strong> ${user!.name}<br>
        <strong>Id del usuario: </strong> ${user!.id}<br>
        <strong>Número del usuario: </strong> ${user!.phone}<br>
        <strong>Plan: </strong> ${group!.plan.service.name}<br>
        <strong>Precio: </strong> ${group!.plan.joinerPay}<br>
        <strong>depositId: </strong> ${deposit.id}<br>
        `,
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
    await sgMail.send(msg);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('validateJoinGroupPayment() Error:', error);

    res.status(500).json({ error });
  }
};

export default validateJoinGroupPayment;
