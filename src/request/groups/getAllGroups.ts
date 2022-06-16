// Types
import { Group, Service } from '@prisma/client';

// Libs
import prisma from 'lib/prisma';
import { Prisma } from '@prisma/client';

const groupWithAdminPlan = Prisma.validator<Prisma.GroupInclude>()({
  admin: {
    select: {
      name: true,
    },
  },
  plan: {
    select: {
      service: true,
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
});

const getAllGroups = async () => {
  const groups = await prisma.group.findMany({
    skip: 0,
    take: 10,
    include: groupWithAdminPlan,
  });

  return groups;
};

export type GroupCardInfo = Group & {
  admin: {
    name: string | null;
  };
  plan: {
    maxUsers: number;
    service: Service;
  };
  userGroups: {
    user: {
      id: string;
    };
  }[];
};

export default getAllGroups;
