// Lib
import prisma from 'lib/prisma';

interface IGenerateInvoiceParams {
  subscriptionId: string;
  transferId: string;
}

const generateInvoice = async (params: IGenerateInvoiceParams) => {
  const { subscriptionId, transferId } = params;

  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      subscriptionId,
      transferId,
      invoicePeriodStart: new Date(),
      invoicePeriodEnd: periodEnd,
    },
  });
  return invoice;
};

export default generateInvoice;
