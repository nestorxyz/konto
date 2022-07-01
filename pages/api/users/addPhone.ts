// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import addPhone from 'request/prisma/users/addPhone';

const addPhoneNumber = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, phone } = req.body;

  try {
    let formattedPhone: string = phone;
    if (phone.length === 9) {
      formattedPhone = '51' + phone;
    }

    const response = await addPhone({ userId, phone: formattedPhone });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default addPhoneNumber;
