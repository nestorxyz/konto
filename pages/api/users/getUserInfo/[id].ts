// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserInfo from 'request/prisma/users/getUserInfo';

const getUserInfoHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  try {
    const response = await getUserInfo(id as string);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getUserInfoHandler;
