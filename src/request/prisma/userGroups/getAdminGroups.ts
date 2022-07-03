// Libs
import prisma from 'lib/prisma';

const getAdminGroup = async (userId: string) => {
  const response = await prisma.group.findMany({
    where: {
      adminId: userId,
    },
    select: {
      id: true,
      verified: true,
      credentialEmail: true,
      credentialPassword: true,
      plan: {
        select: {
          joinerPay: true,
          adminGet: true,
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
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          periodStart: true,
          periodEnd: true,
          state: true,
        },
      },
    },
  });

  return response;
};

export type AdminGroup = Awaited<ReturnType<typeof getAdminGroup>>[0];

export default getAdminGroup;
