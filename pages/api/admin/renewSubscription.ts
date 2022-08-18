// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserGroup from 'request/prisma/subscriptions/getUserGroup';
import makeTransfer from 'request/prisma/transfer/makeTransfer';
import generateRenewInvoice from 'request/prisma/invoice/generateRenewInvoice';
import renewSubscription from 'request/prisma/admin/renewSubscription';

const KONTO_COIN_ADMIN_ID = 'cl6jg0c430011qjwc5g19fwp0';

const handleRenewSubscription = async (
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

    // Generate invoice for userGroup
    const invoice = await generateRenewInvoice({
      userGroup,
      transferId: transfer.id,
    });

    // Renew userGroup
    const renewedUserGroup = await renewSubscription({
      userGroupId,
      invoice,
    });

    res.status(200).json(renewedUserGroup);
  } catch (error) {
    console.error('renewSubscription Error:', error);

    res.status(500).json(error);
  }
};

export default handleRenewSubscription;
