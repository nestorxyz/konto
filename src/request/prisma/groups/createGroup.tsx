// Types
import { Group } from '@prisma/client';

// Libs
import prisma from 'lib/prisma';

type GroupCreate = Pick<
  Group,
  'credentialEmail' | 'credentialPassword' | 'adminId' | 'planId'
>;

const createGroup = async (params: GroupCreate) => {
  const result = await prisma.group.create({
    data: params,
  });
  return result;
};

export default createGroup;
