// Libs
import prisma from 'lib/prisma';

const getUserGroup = async (subscriptionId: string) => {
  const response = await prisma.subscription.findUnique({
    where: {
      id: subscriptionId,
    },
    select: {
      id: true,
      state: true,
      periodStart: true,
      periodEnd: true,
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
          subscriptions: {
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
