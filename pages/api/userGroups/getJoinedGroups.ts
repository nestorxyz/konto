// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getJoinedGroupsRequest from 'request/prisma/userGroups/getJoinedGroups';

const getJoinedGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;

  try {
    const response = await getJoinedGroupsRequest(userId);

    if (!response) return res.status(204).json({ success: true });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error('getJoinedGroups Error:', error);

    res.status(500).json({ error });
  }
};

export default getJoinedGroups;
