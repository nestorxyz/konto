// Lib
import prisma from 'lib/prisma';

// Types
import { Invoice } from '@prisma/client';

interface IRenewSubscriptionParams {
  userGroupId: string;
  invoice: Invoice;
}

const renewSubscription = async (params: IRenewSubscriptionParams) => {
  const { userGroupId, invoice } = params;

  const userGroup = await prisma.subscription.update({
    where: {
      id: userGroupId,
    },
    data: {
      periodStart: invoice.invoicePeriodStart,
      periodEnd: invoice.invoicePeriodEnd,
    },
  });

  return userGroup;
};

export default renewSubscription;
