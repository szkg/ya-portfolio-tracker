import { NextApiRequest, NextApiResponse } from 'next';
import { getPortfolioItems, addPortfolioItem } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const items = await getPortfolioItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch portfolio items' });
    }
  } else if (req.method === 'POST') {
    try {
      const item = req.body;
      const newItem = await addPortfolioItem(item);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add portfolio item' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 