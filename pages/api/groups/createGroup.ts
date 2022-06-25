// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import createGroupRequest from 'request/prisma/groups/createGroup';
import getGroupsWhereUserIsAdmin from 'request/prisma/groups/getGroupsWhereUserIsAdmin';

const createGroup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { adminId, planId, credentialEmail, credentialPassword } = req.body;

  const groupsWhereUserIsAdmin = await getGroupsWhereUserIsAdmin(adminId);
  if (
    groupsWhereUserIsAdmin.length > 0 &&
    groupsWhereUserIsAdmin.some((group) => group.planId === planId)
  ) {
    res.status(200).json({
      error: 'Ya creaste un grupo de este servicio',
    });
    return;
  }

  try {
    const group = await createGroupRequest({
      adminId,
      planId,
      credentialEmail,
      credentialPassword,
    });

    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default createGroup;
