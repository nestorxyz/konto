// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import validatePhoneCode from 'request/prisma/verification/validatePhoneCode';

const validatePhoneCodeHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { userId, code } = req.body;

  try {
    const response = await validatePhoneCode({ userId, code });
    res.status(200).json(response);
  } catch (error) {
    console.error('validatePhoneCodeHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default validatePhoneCodeHandler;
