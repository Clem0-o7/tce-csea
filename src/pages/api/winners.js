// pages/api/winners.js
import { getTopWinners } from '@/db/queries/winners';

export default async function handler(req, res) {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const winners = await getTopWinners(
      parseInt(limit), 
      parseInt(offset)
    );
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching winners:', error);
    res.status(500).json({ error: 'Failed to fetch winners' });
  }
}

