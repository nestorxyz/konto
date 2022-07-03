// Libs
import prisma from 'lib/prisma';

interface IUserJoinValidatingParams {
  userId: string;
  groupId: string;
}

const userJoinValidating = async (params: IUserJoinValidatingParams) => {
  const { userId, groupId } = params;

  const periodEnd = new Date();
  periodEnd.setDate(periodEnd.getDate() + 30);

  const response = await prisma.userGroup.create({
    data: {
      userId,
      groupId,
      state: 'PENDING',
      periodStart: new Date(),
      periodEnd,
    },
  });

  return response;
};

export default userJoinValidating;
