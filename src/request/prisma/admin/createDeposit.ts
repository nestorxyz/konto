// Lib
import prisma from 'lib/prisma';

interface ICreateDepositParams {
  amount: number;
  userId: string;
  paymentMethodId: string;
  keyInfo: string;
}

const CreateDeposit = async (params: ICreateDepositParams) => {
  const { amount, userId, paymentMethodId, keyInfo } = params;

  const deposit = await prisma.deposit.create({
    data: {
      amount,
      userId,
      status: 'VALID',
      paymentMethodId,
      keyInfo,
    },
  });

  return deposit;
};

export default CreateDeposit;
