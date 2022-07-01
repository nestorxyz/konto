// Libs
import prisma from 'lib/prisma';

type ValidatePhoneCodeRequest = {
  userId: string;
  code: string;
};

const validatePhoneCode = async (params: ValidatePhoneCodeRequest) => {
  const { userId, code } = params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: 'Usuario no encontrado' };
  }

  if (user.verificationCode === code) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        phoneVerified: true,
      },
    });
    return true;
  }

  return false;
};

export default validatePhoneCode;
