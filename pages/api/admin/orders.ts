import type { NextApiRequest, NextApiResponse } from 'next';
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { obj1, obj2, obj3 } = req.headers;
  res.status(200).json({ obj1, obj2, obj3 });
};

export default handler;
