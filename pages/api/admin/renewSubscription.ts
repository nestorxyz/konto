// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserGroup from 'request/prisma/subscriptions/getUserGroup';
import makeTransfer from 'request/prisma/transfer/makeTransfer';
import generateRenewInvoice from 'request/prisma/invoice/generateRenewInvoice';
import generatePaymentOrder from 'request/prisma/paymentOrder/generatePaymentOrder';
import renewSubscription from 'request/prisma/admin/renewSubscription';

const handleRenewSubscription = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userGroupId } = req.body;

    const subscription = await getUserGroup(userGroupId);

    if (!subscription)
      return res.status(404).json({ error: 'User group not found' });

    // Do transfer to kontoCoin
    const transfer = await makeTransfer({
      amount: subscription.group.plan.joinerPay,
      senderId: subscription.user.id,
      receiverId: process.env.KONTO_COIN_ADMIN_ID as string,
    });

    // Generate invoice for userGroup
    const invoice = await generateRenewInvoice({
      userId: subscription.user.id,
      subscription,
      transferId: transfer.id,
    });

    // Generate payment order
    const paymentOrder = await generatePaymentOrder({
      userId: subscription.group.adminId,
      subscriptionId: subscription.id,
      paymentDate: invoice.invoicePeriodEnd,
    });
    if (!paymentOrder)
      return res.status(500).json({ error: 'Error generando orden de pago' });

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
