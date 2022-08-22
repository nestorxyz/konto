// Lib
import prisma from 'lib/prisma';

interface IGenerateInvoiceParams {
  userId: string;
  subscriptionId: string;
  transferId: string;
}

const generateInvoice = async (params: IGenerateInvoiceParams) => {
  const { userId, subscriptionId, transferId } = params;

  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      userId,
      subscriptionId,
      transferId,
      invoicePeriodStart: new Date(),
      invoicePeriodEnd: periodEnd,
    },
  });
  return invoice;
};

export default generateInvoice;
