// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import verifyPayment from 'request/prisma/admin/verifyPayment';
import sendSuccessfulPaymentEmailToJoinerNAdmin from 'request/prisma/emails/sendSuccessfulPaymentEmail';

const verifyPaymentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userGroupId } = req.body;

    const userGroup = await verifyPayment(userGroupId);

    if (!userGroup)
      return res.status(204).json({
        error: 'No se encontró el userGroup',
      });

    if (userGroup.state === 'ACTIVE') {
      await sendSuccessfulPaymentEmailToJoinerNAdmin(userGroup.id);
    }

    res.status(200).json(userGroup);
  } catch (error) {
    console.error('verifyPaymentHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default verifyPaymentHandler;
