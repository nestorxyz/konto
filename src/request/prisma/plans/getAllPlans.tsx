// Libraries
import { Prisma } from '@prisma/client';

// Libs
import prisma from 'lib/prisma';

const getAllPlans = () => {
  return prisma.plan.findMany({
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

export type Plan = {
  id: string;
  adminGet: number;
  joinerPay: number;
  maxUsers: number;
  service: {
    id: string;
    name: string;
    value: string;
  };
};

export default getAllPlans;
