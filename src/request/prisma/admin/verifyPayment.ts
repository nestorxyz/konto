// Libs
import prisma from 'lib/prisma';

const verifyPayment = async (userGroupId: string) => {
  const userGroup = await prisma.userGroup.update({
    where: { id: userGroupId },
    data: { state: 'ACTIVE' },
  });

  return userGroup;
};

export default verifyPayment;
