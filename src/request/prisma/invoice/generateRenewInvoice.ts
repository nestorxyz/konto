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

  // sum 30 days from userGroup.periodEnd
  const periodEnd = new Date(userGroup!.periodEnd);
  periodEnd.setDate(periodEnd.getDate() + 30);

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
