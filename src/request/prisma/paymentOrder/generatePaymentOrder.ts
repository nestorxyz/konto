// Lib
import prisma from 'lib/prisma';

interface IGeneratePaymentOrderParams {
  userId: string;
  subscriptionId: string;
  paymentDate: Date;
}

const generatePaymentOrder = async (params: IGeneratePaymentOrderParams) => {
  const { userId, subscriptionId, paymentDate } = params;

  const paymentOrder = await prisma.paymentOrder.create({
    data: {
      userId,
      subscriptionId,
      paymentDate,
    },
  });

  return paymentOrder;
};

export default generatePaymentOrder;
