// Lib
import prisma from 'lib/prisma';

interface IGenerateInvoiceParams {
  userGroupId: string;
  transferId: string;
}

const generateInvoice = async (params: IGenerateInvoiceParams) => {
  const { userGroupId, transferId } = params;

  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      userGroupId,
      transferId,
      invoicePeriodStart: new Date(),
      invoicePeriodEnd: periodEnd,
    },
  });
  return invoice;
};

export default generateInvoice;
