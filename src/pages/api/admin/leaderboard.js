// filepath: /d:/Projects/tce-csea/src/pages/api/admin/leaderboard.js
import { desc, eq, sql } from 'drizzle-orm';
import { db } from '@/db/db';
import { persons, eventWinners } from '@/db/schema';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const leaderboard = await db
      .select({
        id: persons.id,
        name: persons.name,
        registerNumber: persons.registerNumber,
        totalPoints: persons.totalEventPoints,
        eventsWon: db
          .select({ count: sql`count(*)` })
          .from(eventWinners)
          .where(eq(eventWinners.personId, persons.id))
          .as('eventsWon'),
      })
      .from(persons)
      .orderBy(desc(persons.totalEventPoints))
      .limit(100);

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}