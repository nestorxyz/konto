// Lib
import prisma from 'lib/prisma';

// Types
import { UserGroup } from 'request/prisma/subscriptions/getUserGroup';

interface IGenerateInvoiceParams {
  userId: string;
  subscription: UserGroup;
  transferId: string;
}

const generateRenewInvoice = async (params: IGenerateInvoiceParams) => {
  const { userId, subscription, transferId } = params;

  // sum 30 days from userGroup.periodEnd
  const periodEnd = new Date(subscription!.periodEnd);
  periodEnd.setDate(periodEnd.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      userId,
      subscriptionId: subscription!.id,
      transferId,
      invoicePeriodStart: subscription!.periodEnd,
      invoicePeriodEnd: periodEnd,
    },
  });
  return invoice;
};

export default generateRenewInvoice;
