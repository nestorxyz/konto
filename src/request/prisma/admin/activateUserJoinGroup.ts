// Libs
import prisma from 'lib/prisma';

interface IActivateUserJoinGroupParams {
  userGroupId: string;
  periodStart: Date;
  periodEnd: Date;
}

const activateUserJoinGroup = async (params: IActivateUserJoinGroupParams) => {
  const { userGroupId, periodStart, periodEnd } = params;

  const userGroup = await prisma.userGroup.update({
    where: { id: userGroupId },
    data: { state: 'ACTIVE', periodStart, periodEnd },
  });

  return userGroup;
};

export default activateUserJoinGroup;
