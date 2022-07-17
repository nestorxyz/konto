// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllUserGroups from 'request/prisma/admin/getAllUserGroups';

const getAllUserGroupsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { skip = 0, take = 10 } = req.query;

    const groups = await getAllUserGroups({
      skip: Number(skip),
      take: Number(take),
    });

    res.status(200).json(groups);
  } catch (error) {
    console.error('getAllUserGroupsHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default getAllUserGroupsHandler;
