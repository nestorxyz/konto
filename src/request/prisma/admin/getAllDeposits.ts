// Libs
import prisma from 'lib/prisma';

interface IGetAllDepositsParams {
  skip?: number;
  take?: number;
}

const getAllDeposits = async (params: IGetAllDepositsParams) => {
  const { skip = 0, take = 10 } = params;

  const deposits = await prisma.deposit.findMany({
    skip: skip,
    take: take,
    select: {
      id: true,
      amount: true,
      keyInfo: true,
      paymentMethod: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          balance: true,
        },
      },
    },
  });

  return deposits;
};

export type AdminDeposit = Awaited<ReturnType<typeof getAllDeposits>>[0];

export default getAllDeposits;
