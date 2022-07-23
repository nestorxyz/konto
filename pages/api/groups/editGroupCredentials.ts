// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import editGroupCredentials from 'request/prisma/groups/editGroupCredentials';
import sendEditedCredentialsToJoiner from 'request/prisma/emails/sendEditedCredentialsToJoiners';

const editGroupCredentialsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { groupId, credentialEmail, credentialPassword } = req.body;

    const group = await editGroupCredentials({
      groupId,
      credentialEmail,
      credentialPassword,
    });

    if (!group) {
      return res.status(404).json({ error: 'No existe este grupo' });
    }

    await sendEditedCredentialsToJoiner(groupId);

    res
      .status(200)
      .json({ success: 'Cambios guardados con éxito', data: group });
  } catch (error) {
    console.error('editGroupCredentialsHandler() Error:', error);

    res.status(500).json({ error });
  }
};

export default editGroupCredentialsHandler;
