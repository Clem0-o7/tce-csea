// src/db/queries/winners.js
import { sql, eq, or, like, desc } from 'drizzle-orm'; 
import { db } from '@/db/db';
import { persons, eventWinners, events } from '@/db/schema';

// Modified query to get event winners by event name
export async function getEventWinners(eventName) {
  return await db.query.eventWinners.findMany({
    where: eq(eventWinners.eventName, eventName), 
    with: {
      person: true
    }
  });
}


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
            'eventName', ${eventWinners.eventName},
            'rank', ${eventWinners.rank},
            'year', ${eventWinners.year},
            'pointsEarned', ${eventWinners.pointsEarned}
          )
        )
      `.as('events')
    })
    .from(persons)
    .leftJoin(eventWinners, eq(persons.id, eventWinners.personId))
    .groupBy(persons.id)
    .orderBy(sql`total_event_points DESC`)
    .limit(limit)
    .offset(offset);
}


// Example search function (updated for event_name)
export async function searchPersons(searchTerm) {
  return await db.query.persons.findMany({
    where: or(
      like(persons.name, `%${searchTerm}%`),
      like(persons.registerNumber, `%${searchTerm}%`)
    ),
    limit: 10
  });
}

// Other functions remain unchanged
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
    .leftJoin(eventWinners, eq(events.name, eventWinners.eventName)) 
    .leftJoin(persons, eq(eventWinners.personId, persons.id)) 
    .orderBy(desc(events.date))
    .limit(1)
    .groupBy(events.id);
}

export async function createEventWinner(winnerData) {
  return await db.insert(eventWinners).values(winnerData).returning();
}

export async function updateEventWinner(id, winnerData) {
  return await db.update(eventWinners).set(winnerData).where(eq(eventWinners.id, id)).returning();
}

export async function deleteEventWinner(id) {
  return await db.delete(eventWinners).where(eq(eventWinners.id, id)).returning();
}

export async function addPerson(personName) {
  const result = await db('persons').insert({
    name: personName,
  }).returning('id');
  return { id: result[0].id, name: personName };
}
