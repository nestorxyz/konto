// Libs
import prisma from 'lib/prisma';

interface IActivateUserJoinGroupParams {
  subscriptionId: string;
  periodStart: Date;
  periodEnd: Date;
}

const activateUserJoinGroup = async (params: IActivateUserJoinGroupParams) => {
  const { subscriptionId, periodStart, periodEnd } = params;

  const userGroup = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { state: 'ACTIVE', periodStart, periodEnd },
  });

  return userGroup;
};

export default activateUserJoinGroup;
