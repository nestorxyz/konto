// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllDeposits from 'request/prisma/admin/getAllDeposits';

const getAllDepositsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { skip = 0, take = 10 } = req.query;

    const deposits = await getAllDeposits({
      skip: Number(skip),
      take: Number(take),
    });

    res.status(200).json(deposits);
  } catch (error) {
    console.error('getAllDepositsHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default getAllDepositsHandler;
