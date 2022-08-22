// Lib
import prisma from 'lib/prisma';

interface IFundWalletParams {
  userId: string;
  amount: number;
}

const fundWallet = async (params: IFundWalletParams) => {
  const { userId, amount } = params;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  return user;
};

export default fundWallet;
