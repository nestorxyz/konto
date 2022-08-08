// Libs
import prisma from 'lib/prisma';

interface IUserDepositValidatingParams {
  amount: number;
  userId: string;
  paymentMethodId: string;
}

const userDepositValidating = async (params: IUserDepositValidatingParams) => {
  const { amount, userId, paymentMethodId } = params;

  const deposit = await prisma.deposit.create({
    data: {
      amount,
      userId,
      paymentMethodId,
      status: 'VALIDATING',
      keyInfo: 'null',
    },
  });

  return deposit;
};

export default userDepositValidating;
