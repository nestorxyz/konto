// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllPlansRequest from 'request/prisma/plans/getAllPlans';

const getAllPlans = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await getAllPlansRequest();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getAllPlans;
