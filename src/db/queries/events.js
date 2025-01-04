// @/db/queries/events.js
import { db } from '@/db/db';
import { events } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// Fetch events marked for carousel
export async function getCarouselEvents() {
  try {
    const carouselEvents = await db
      .select({
        id: events.id,
        name: events.name,
        description: events.description,
        date: events.date,
        status: events.status,
        registrationLink: events.registrationLink,
        eventImage: events.eventImage,
        conductedBy: events.conductedBy,
        teamSizeMin: events.teamSizeMin,
        teamSizeMax: events.teamSizeMax
      })
      .from(events)
      .where(eq(events.in_carousal, true))
      .orderBy(events.createdAt);

    return carouselEvents;
  } catch (error) {
    console.error('Error fetching carousel events:', error);
    return [];
  }
}

// Fetch upcoming events
export async function getUpcomingEvents() {
  try {
    const upcomingEvents = await db
      .select({
        id: events.id,
        name: events.name,
        description: events.description,
        date: events.date,
        registrationLink: events.registrationLink
      })
      .from(events)
      .where(eq(events.status, 'upcoming'))
      .orderBy(events.date);

    return upcomingEvents;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}



export async function getAllEvents() {
  return await db.select().from(events);
}

export async function addEvent(eventData) {
  return await db.insert(events).values(eventData).returning();
}

export async function updateEvent(id, eventData) {
  return await db.update(events)
    .set(eventData)
    .where(eq(events.id, id))
    .returning();
}

export async function deleteEvent(id) {
  return await db.delete(events)
    .where(eq(events.id, id))
    .returning();
}