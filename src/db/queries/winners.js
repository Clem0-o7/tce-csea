import { desc, sql, eq } from 'drizzle-orm'; // Ensure eq is imported
import { db } from '@/db/db';
import { persons, eventWinners, events } from '@/db/schema';

export async function getTopWinners(limit = 10, offset = 0) {
  return await db
    .select({
      personId: persons.id,
      name: persons.name,
      batch: persons.batch,
      totalPoints: persons.totalEventPoints,
      events: sql`
        json_agg(
          json_build_object(
            'eventName', ${events.name},
            'rank', ${eventWinners.rank},
            'year', ${eventWinners.year},
            'pointsEarned', ${eventWinners.pointsEarned}
          )
        )
      `.as('events')
    })
    .from(persons)
    .leftJoin(eventWinners, eq(persons.id, eventWinners.personId)) // Uses eq
    .leftJoin(events, eq(eventWinners.eventId, events.id)) // Uses eq
    .groupBy(persons.id)
    .orderBy(desc(persons.totalEventPoints))
    .limit(limit)
    .offset(offset);
}

export async function getTopThreeFromLatestEvent() {
  return await db
    .select({
      eventName: events.name,
      winners: sql`
        json_agg(
          json_build_object(
            'name', ${persons.name},
            'rank', ${eventWinners.rank},
            'points', ${eventWinners.pointsEarned}
          )
        )
      `.as('winners')
    })
    .from(events)
    .leftJoin(eventWinners, eq(events.id, eventWinners.eventId)) // Uses eq
    .leftJoin(persons, eq(eventWinners.personId, persons.id)) // Uses eq
    .orderBy(desc(events.date))
    .limit(1)
    .groupBy(events.id);
}
