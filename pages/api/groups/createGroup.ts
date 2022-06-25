// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import createGroupRequest from 'request/prisma/groups/createGroup';

const createGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default createGroup;
