// Libs
import prisma from 'lib/prisma';

interface IGetAllUserGroupsParams {
  skip?: number;
  take?: number;
}

const getAllUserGroups = async (params: IGetAllUserGroupsParams) => {
  const { skip = 0, take = 10 } = params;

  const userGroups = await prisma.userGroup.findMany({
    skip: skip,
    take: take,
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

export type AdminUserGroup = Awaited<ReturnType<typeof getAllUserGroups>>[0];

export default getAllUserGroups;