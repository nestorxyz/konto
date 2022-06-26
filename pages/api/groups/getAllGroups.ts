// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllGroups from 'request/prisma/groups/getAllGroups';

const getAllGroupsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const groups = await getAllGroups();

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default getAllGroupsHandler;
