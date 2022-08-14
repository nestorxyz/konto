// Libs
import prisma from 'lib/prisma';

const verifyDeposit = async (depositId: string) => {
  const deposit = await prisma.deposit.update({
    where: { id: depositId },
    data: { status: 'VALID' },
  });

  const user = await prisma.user.update({
    where: {
      id: deposit.userId,
    },
    data: {
      walletAvailable: {
        increment: deposit.amount,
      },
    },
  });

  return user;
};

export default verifyDeposit;
