// Types
import { Group } from '@prisma/client';

// Libs
import prisma from 'lib/prisma';

const getGroupsWhereUserIsAdmin = async (userId: string) => {
  const groups: Group[] = await prisma.group.findMany({
    where: {
      adminId: userId,
    },
  });

  return groups;
};

export default getGroupsWhereUserIsAdmin;
