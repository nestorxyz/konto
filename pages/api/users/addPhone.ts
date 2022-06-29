// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import addPhone from 'request/prisma/users/addPhone';

const addPhoneNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, phone } = req.body;

  try {
    const response = await addPhone({ userId, phone });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default addPhoneNumber;
