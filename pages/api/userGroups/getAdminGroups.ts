// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAdminGroupsRequest from 'request/prisma/userGroups/getAdminGroups';

const getAdminGroups = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;

  try {
    const response = await getAdminGroupsRequest(userId);

    if (!response) return res.status(204).json({ success: true });

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error('getJoinedGroups Error:', error);

    res.status(500).json({ error });
  }
};

export default getAdminGroups;
