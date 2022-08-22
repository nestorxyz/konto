// Libs
import prisma from 'lib/prisma';

const getAllPaymentMethods = async () => {
  const paymentMethods = await prisma.paymentMethod.findMany();

  return paymentMethods;
};

export type PaymentMethod = Awaited<ReturnType<typeof getAllPaymentMethods>>[0];

export default getAllPaymentMethods;
