// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserGroup from 'request/prisma/subscriptions/getUserGroup';
import makeTransfer from 'request/prisma/transfer/makeTransfer';
import generateInvoice from 'request/prisma/invoice/generateInvoice';
import generatePaymentOrder from 'request/prisma/paymentOrder/generatePaymentOrder';
import activateUserJoinGroup from 'request/prisma/admin/activateUserJoinGroup';

const validateUserJoinGroup = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await getUserGroup(subscriptionId);

    if (!subscription)
      return res.status(404).json({ error: 'User group not found' });

    // Do transfer to kontoCoin
    const transfer = await makeTransfer({
      amount: subscription.group.plan.joinerPay,
      senderId: subscription.user.id,
      receiverId: process.env.KONTO_COIN_ADMIN_ID as string,
    });
    if (!transfer) return res.status(500).json({ error: 'Transfer error' });
    if (transfer.status !== 'VALID')
      return res.status(500).json({ error: 'Transfer error' });

    // Generate invoice for subscription
    const invoice = await generateInvoice({
      userId: subscription.user.id,
      subscriptionId,
      transferId: transfer.id,
    });
    if (!invoice) return res.status(500).json({ error: 'Invoice error' });

    // Generate payment order
    const paymentOrder = await generatePaymentOrder({
      userId: subscription.group.adminId,
      subscriptionId,
      paymentDate: invoice.invoicePeriodEnd,
    });
    if (!paymentOrder)
      return res.status(500).json({ error: 'Payment order error' });

    // Validate userGroup
    const userGroupValidated = await activateUserJoinGroup({
      subscriptionId,
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
