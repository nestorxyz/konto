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
          id: true,
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

export type GroupCardInfo = Awaited<ReturnType<typeof getAllGroups>>[0];

export default getAllGroups;
