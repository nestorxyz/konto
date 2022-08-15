// Lib
import prisma from 'lib/prisma';

// Types
import { UserGroup } from 'request/prisma/userGroups/getUserGroup';

interface IGenerateInvoiceParams {
  userGroup: UserGroup;
  transferId: string;
}

const generateRenewInvoice = async (params: IGenerateInvoiceParams) => {
  const { userGroup, transferId } = params;

  const periodEnd = new Date();
  periodEnd.setDate(userGroup!.periodEnd.getDate() + 30);

  const invoice = await prisma.invoice.create({
    data: {
      userGroupId: userGroup!.id,
      transferId,
      invoicePeriodStart: userGroup!.periodEnd,
      invoicePeriodEnd: periodEnd,
    },
  });
  return invoice;
};

export default generateRenewInvoice;
