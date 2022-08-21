// Libs
import prisma from 'lib/prisma';

// Types
import { DepositType } from '@prisma/client';

interface IUserDepositValidatingParams {
  amount: number;
  userId: string;
  paymentMethodId: string;
  keyInfo?: string;
  depositType?: DepositType;
  typeInfo?: string;
}

const userDepositValidating = async (params: IUserDepositValidatingParams) => {
  const { amount, userId, paymentMethodId, keyInfo, depositType, typeInfo } =
    params;

  const deposit = await prisma.deposit.create({
    data: {
      amount,
      userId,
      paymentMethodId,
      status: 'VALIDATING',
      keyInfo: keyInfo ? keyInfo : 'No key info',
      depositType: depositType ? depositType : 'WALLET',
      typeInfo: typeInfo ? typeInfo : 'No type info',
    },
  });

  return deposit;
};

export default userDepositValidating;
