// Libs
import prisma from 'lib/prisma';

const getPaymentMethod = async (paymentMethodId: string) => {
  const paymentMethods = await prisma.paymentMethod.findUnique({
    where: { id: paymentMethodId },
  });

  return paymentMethods;
};

export type PaymentMethod = Awaited<ReturnType<typeof getPaymentMethod>>;

export default getPaymentMethod;
