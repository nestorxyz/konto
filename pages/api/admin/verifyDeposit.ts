// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import verifyDeposit from 'request/prisma/admin/verifyDeposit';

const handleVerifyDeposit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { depositId } = req.body;

    if (!depositId)
      return res.status(400).json({
        error: 'Missing depositId',
      });

    const user = await verifyDeposit(depositId);

    if (!user)
      return res.status(204).json({
        error: 'Error al verificar el deposito',
      });

    res.status(200).json(user);
  } catch (error) {
    console.error('handleVerifyDeposit Error:', error);

    res.status(500).json({ error });
  }
};

export default handleVerifyDeposit;
