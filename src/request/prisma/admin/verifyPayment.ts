// Libs
import prisma from 'lib/prisma';

const verifyPayment = async (userGroupId: string) => {
  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 30);

  const userGroup = await prisma.userGroup.update({
    where: { id: userGroupId },
    data: { state: 'ACTIVE', periodStart: new Date(), periodEnd },
  });

  return userGroup;
};

export default verifyPayment;
