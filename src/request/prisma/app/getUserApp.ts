// Lib
import prisma from 'lib/prisma';

const getUserApp = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      username: true,
      balance: true,
      image: true,
      isAdmin: true,
      groups: {
        select: {
          id: true,
          verified: true,
          credentialEmail: true,
          credentialPassword: true,
          plan: {
            select: {
              id: true,
              adminGet: true,
              maxUsers: true,
              service: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  value: true,
                },
              },
            },
          },
          subscriptions: {
            where: {
              state: 'ACTIVE',
            },
            select: {
              id: true,
              periodStart: true,
              periodEnd: true,
              group: {
                select: {
                  id: true,
                  plan: {
                    select: {
                      id: true,
                      adminGet: true,
                      service: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
      subscriptions: {
        where: {
          state: 'ACTIVE',
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
              plan: {
                select: {
                  id: true,
                  joinerPay: true,
                  service: {
                    select: {
                      id: true,
                      name: true,
                      value: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) throw new Error('User not found');

  return user;
};

export type UserApp = Awaited<ReturnType<typeof getUserApp>>;
export type UserGroup = Awaited<ReturnType<typeof getUserApp>>['groups'][0];
export type UserSubscription = Awaited<
  ReturnType<typeof getUserApp>
>['subscriptions'][0];

export default getUserApp;
