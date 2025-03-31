import { db } from '../db';
import { galleryImages } from '../schema';
import { desc, eq } from 'drizzle-orm';

export async function getAllGalleryImages() {
  return await db
    .select()
    .from(galleryImages)
    .orderBy(desc(galleryImages.academicYear), desc(galleryImages.uploadedAt));
}

export async function getGalleryImageById(id) {
  const results = await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.id, id));
  
  return results[0] || null;
}

export async function getCarouselGalleryImages() {
  return await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.in_carousal, true))
    .orderBy(desc(galleryImages.uploadedAt))
    .limit(10);
}