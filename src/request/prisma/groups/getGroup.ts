// Libs
import prisma from 'lib/prisma';

const getGroup = async (groupId: string) => {
  const groups = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
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
              email: true,
            },
          },
        },
      },
    },
  });

  return groups;
};

export type GroupInfo = Awaited<ReturnType<typeof getGroup>>;

export default getGroup;
