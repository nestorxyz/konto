// Libs
import prisma from 'lib/prisma';

const getJoinedGroups = async (userId: string) => {
  const response = await prisma.userGroup.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      joinedAt: true,
      periodStart: true,
      periodEnd: true,
      state: true,
      group: {
        select: {
          id: true,
          verified: true,
          credentialEmail: true,
          credentialPassword: true,
          adminId: true,
          plan: {
            select: {
              id: true,
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
          },
          userGroups: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return response;
};

export type JoinedGroup = Awaited<ReturnType<typeof getJoinedGroups>>[0];

export default getJoinedGroups;
