// Libs
import prisma from 'lib/prisma';

// Helpers
import { randomString_v2 } from 'lib/logicFunctions';

type GeneratePhoneVerificationRequest = {
  userId: string;
};

const generatePhoneVerification = async (
  params: GeneratePhoneVerificationRequest
) => {
  const { userId } = params;

  const verificationCode = randomString_v2(7);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      verificationCode: verificationCode,
    },
  });

  return user.verificationCode;
};

export default generatePhoneVerification;
