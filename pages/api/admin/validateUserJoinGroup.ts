// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserGroup from 'request/prisma/userGroups/getUserGroup';
import makeTransfer from 'request/prisma/transfer/makeTransfer';
import generateInvoice from 'request/prisma/invoice/generateInvoice';
import activateUserJoinGroup from 'request/prisma/admin/activateUserJoinGroup';

const KONTO_COIN_ADMIN_ID = 'cl6jg0c430011qjwc5g19fwp0';

const validateUserJoinGroup = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userGroupId } = req.body;

    const userGroup = await getUserGroup(userGroupId);

    if (!userGroup)
      return res.status(404).json({ error: 'User group not found' });

    // Do transfer to kontoCoin
    const transfer = await makeTransfer({
      amount: userGroup.group.plan.joinerPay,
      senderId: userGroup.user.id,
      receiverId: KONTO_COIN_ADMIN_ID,
    });
    if (!transfer) return res.status(500).json({ error: 'Transfer error' });
    if (transfer.status !== 'VALID')
      return res.status(500).json({ error: 'Transfer error' });

    // Generate invoice for userGroup
    const invoice = await generateInvoice({
      userGroupId,
      transferId: transfer.id,
    });
    if (!invoice) return res.status(500).json({ error: 'Invoice error' });

    // Validate userGroup
    const userGroupValidated = await activateUserJoinGroup({
      userGroupId,
      periodStart: invoice.invoicePeriodStart,
      periodEnd: invoice.invoicePeriodEnd,
    });

    res.status(200).json(userGroupValidated);
  } catch (error) {
    console.error('validateUserJoinGroup Error:', error);

    res.status(500).json({ error });
  }
};

export default validateUserJoinGroup;
