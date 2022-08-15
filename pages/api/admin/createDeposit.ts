// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request

const handleCreateDeposit = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userGroupId } = req.body;

    res.status(200).json(true);
  } catch (error) {
    console.error('handleCreateDeposit Error:', error);

    res.status(500).json({ error });
  }
};

export default handleCreateDeposit;
