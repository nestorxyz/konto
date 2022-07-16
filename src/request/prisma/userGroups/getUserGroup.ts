// Libs
import prisma from 'lib/prisma';

const getUserGroup = async (userGroupId: string) => {
  const response = await prisma.userGroup.findUnique({
    where: {
      id: userGroupId,
    },
    select: {
      id: true,
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return response;
};

export type UserGroup = Awaited<ReturnType<typeof getUserGroup>>;

export default getUserGroup;
