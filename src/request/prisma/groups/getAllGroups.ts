// Types
import { Group, Service } from '@prisma/client';

// Libs
import prisma from 'lib/prisma';

const getAllGroups = async () => {
  const groups = await prisma.group.findMany({
    skip: 0,
    take: 10,
    select: {
      id: true,
      verified: true,
      admin: {
        select: {
          name: true,
        },
      },
      plan: {
        select: {
          service: {
            select: {
              id: true,
              name: true,
              value: true,
              price: true,
            },
          },
          joinerPay: true,
          maxUsers: true,
        },
      },
      userGroups: {
        select: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return groups;
};

export type GroupCardInfo = {
  id: string;
  verified: boolean;
  admin: {
    name: string | null;
  };
  plan: {
    maxUsers: number;
    joinerPay: number;
    service: {
      id: string;
      name: string;
      value: string;
      price: number;
    };
  };
  userGroups: {
    user: {
      id: string;
    };
  }[];
};

export default getAllGroups;
