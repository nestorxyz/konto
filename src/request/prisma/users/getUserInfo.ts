// Libs
import prisma from 'lib/prisma';

const getUserInfo = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};

export default getUserInfo;
