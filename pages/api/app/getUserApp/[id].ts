// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getUserApp from 'request/prisma/app/getUserApp';
import getUserMovements from 'request/prisma/app/getUserMovements';

const getUserAppHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const [user, movements] = await Promise.all([
      getUserApp(id as string),
      getUserMovements(id as string),
    ]);

    res.status(200).json({
      user,
      movements,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getUserAppHandler;
