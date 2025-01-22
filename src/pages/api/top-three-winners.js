// pages/api/top-three-winners.js
import { getTopThreeFromLatestEvent } from '@/db/queries/winners';

export default async function handler(req, res) {
  try {
    const topThree = await getTopThreeFromLatestEvent();
    res.status(200).json(topThree);
  } catch (error) {
    console.error('Error fetching top three winners:', error);
    res.status(500).json({ error: 'Failed to fetch top three winners' });
  }
}