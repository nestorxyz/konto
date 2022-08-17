// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

// Request
import getAllPaymentMethods from 'request/prisma/paymentMethod/getAllPaymentMethods';

const getAllPaymentMethodsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const paymentMethods = await getAllPaymentMethods();

    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('getAllDepositsHandler Error:', error);

    res.status(500).json({ error });
  }
};

export default getAllPaymentMethodsHandler;
