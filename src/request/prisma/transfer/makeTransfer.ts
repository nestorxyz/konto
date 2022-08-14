// Lib
import prisma from 'lib/prisma';

interface ITransferParams {
  amount: number;
  senderId: string;
  receiverId: string;
}

const transfer = async (params: ITransferParams) => {
  const { amount, senderId, receiverId } = params;

  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  const receiver = await prisma.user.findUnique({ where: { id: receiverId } });

  if (!sender || !receiver) {
    throw new Error('User not found');
  }
  if (sender.balance < amount) {
    throw new Error('Not enough balance');
  }

  const transferValidating = await prisma.transfer.create({
    data: {
      amount,
      senderId,
      receiverId,
      status: 'VALIDATING',
    },
  });

  await prisma.user.update({
    where: { id: senderId },
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
  await prisma.user.update({
    where: { id: receiverId },
    data: {
      balance: {
        increment: amount,
      },
    },
  });

  const transfer = await prisma.transfer.update({
    where: { id: transferValidating.id },
    data: {
      status: 'VALID',
    },
  });

  return transfer;
};

export default transfer;
