// Libraries
import { NextApiRequest, NextApiResponse } from 'next';

const handleWhatsappWebhook = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    console.log(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handleWhatsappWebhook;
