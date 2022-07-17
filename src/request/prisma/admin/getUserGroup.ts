// Libs
import prisma from 'lib/prisma';

const getUserGroup = async (getUserGroup: string) => {
  const userGroups = await prisma.userGroup.findUnique({
    where: { id: getUserGroup },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
      state: true,
      group: {
        select: {
          id: true,
          verified: true,
          admin: {
            select: {
              id: true,
              name: true,
              email: true,
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
              adminGet: true,
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
      },
    },
  });

  return userGroups;
};

export type AdminUserGroup = Awaited<ReturnType<typeof getUserGroup>>;

export default getUserGroup;
