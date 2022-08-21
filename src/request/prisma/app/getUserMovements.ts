// Lib
import prisma from 'lib/prisma';

const getUserMovements = async (id: string) => {
  const userMovements = await prisma.user.findUnique({
    where: { id },
    select: {
      invoices: {
        select: {
          id: true,
          movementType: true,
          updatedAt: true,
          transfer: {
            select: {
              id: true,
              amount: true,
              status: true,
              updatedAt: true,
            },
          },
          subscription: {
            select: {
              id: true,
              group: {
                select: {
                  id: true,
                  admin: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                  plan: {
                    select: {
                      id: true,
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
            },
          },
        },
      },
      paymentOrders: {
        where: { status: 'DONE' },
        select: {
          id: true,
          movementType: true,
          paymentDate: true,
          transfer: {
            select: {
              id: true,
              amount: true,
              status: true,
              updatedAt: true,
            },
          },
          updatedAt: true,
          subscription: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
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
            },
          },
        },
      },
      deposits: {
        select: {
          id: true,
          movementType: true,
          amount: true,
          status: true,
          updatedAt: true,
        },
      },
      withdrawals: {
        select: {
          id: true,
          movementType: true,
          amount: true,
          status: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!userMovements) {
    throw new Error('User not found');
  }

  // Order all movements by Date in descending order
  const userMovementsSorted = [
    ...userMovements.invoices,
    ...userMovements.paymentOrders,
    ...userMovements.deposits,
    ...userMovements.withdrawals,
  ]
    .sort((a, b) => {
      if (a.updatedAt > b.updatedAt) return -1;
      if (a.updatedAt < b.updatedAt) return 1;
      return 0;
    })
    .reverse();

  return userMovementsSorted;
};

export default getUserMovements;
