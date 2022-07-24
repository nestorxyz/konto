// Libs
import prisma from 'lib/prisma';

interface IEditGroupCredentialsParams {
  groupId: string;
  credentialEmail: string;
  credentialPassword: string;
}

const editGroupCredentials = async (params: IEditGroupCredentialsParams) => {
  const { groupId, credentialEmail, credentialPassword } = params;

  const group = await prisma.group.update({
    where: { id: groupId },
    data: {
      credentialEmail,
      credentialPassword,
    },
  });

  return group;
};

export default editGroupCredentials;
