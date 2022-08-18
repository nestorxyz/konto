// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserApp from 'request/prisma/app/getUserApp';

const getUserAppHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const response = await getUserApp(id as string);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getUserAppHandler;
