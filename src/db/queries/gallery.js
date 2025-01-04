import { db } from '../db';
import { galleryImages } from '../schema';
import { desc, eq } from 'drizzle-orm';

export async function getCarouselGalleryImages() {
  return await db
    .select()
    .from(galleryImages)
    .where(eq(galleryImages.in_carousal, true))
    .orderBy(desc(galleryImages.uploadedAt))
    .limit(10);
}

export async function getAllGalleryImages() {
  return await db
    .select()
    .from(galleryImages)
    .orderBy(desc(galleryImages.academicYear), desc(galleryImages.uploadedAt));
}