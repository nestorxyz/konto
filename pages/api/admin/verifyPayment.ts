// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllUserGroups from 'request/prisma/admin/getAllUserGroups';

const verifyPaymentHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userGroupId } = req.body;

    res.status(200).json({});
  } catch (error) {
    console.error('verifyPaymentHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default verifyPaymentHandler;
