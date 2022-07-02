// Libs
import prisma from 'lib/prisma';

const getPlan = (planId: string) => {
  return prisma.plan.findUnique({
    where: {
      id: planId,
    },
    select: {
      id: true,
      adminGet: true,
      joinerPay: true,
      maxUsers: true,
      service: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
    },
  });
};

export type PlanInfo = Awaited<ReturnType<typeof getPlan>>;

export default getPlan;
