import { NextApiRequest, NextApiResponse } from 'next';
import { getPortfolioItems, addPortfolioItem } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.url === '/api/portfolio') {
    try {
      const items = await getPortfolioItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio items' });
    }
  } else if (req.url === '/api/portfolio') {
    try {
      const item = req.body;
      await addPortfolioItem(item);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add portfolio item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 