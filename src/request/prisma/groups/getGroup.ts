// Libs
import prisma from 'lib/prisma';

interface getGroupRequest {
  groupId: string;
}

const getGroup = async ({ groupId }: getGroupRequest) => {
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
