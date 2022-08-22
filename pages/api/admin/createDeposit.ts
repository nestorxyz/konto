// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import createDeposit from 'request/prisma/admin/createDeposit';
import fundWallet from 'request/prisma/admin/fundWallet';

const handleCreateDeposit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { amount, userId, paymentMethodId, keyInfo } = req.body;

    // Create deposit
    const deposit = await createDeposit({
      amount,
      userId,
      paymentMethodId,
      keyInfo,
    });
    if (!deposit) return res.status(400).json(new Error('Deposit not created'));

    // Fund wallet
    const user = await fundWallet({
      userId,
      amount,
    });
    if (!user) return res.status(400).json(new Error('User not funded'));

    res.status(200).json(true);
  } catch (error) {
    console.error('handleCreateDeposit Error:', error);

    res.status(500).json(error);
  }
};

export default handleCreateDeposit;
