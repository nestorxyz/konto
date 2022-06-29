// Libs
import prisma from 'lib/prisma';

type AddPhoneRequest = {
  userId: string;
  phone: string;
};

const addPhone = async (params: AddPhoneRequest) => {
  const { userId, phone } = params;
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      phone: phone,
    },
  });
  return user;
};

export default addPhone;
