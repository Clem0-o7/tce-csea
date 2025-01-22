import { formatISO } from 'date-fns';

export async function fetchData() {
  try {
    const response = await fetch('/api/data'); // Adjust with the actual API endpoint
    const { carouselEvents, officeBearers, magazines, galleryImages } = await response.json();

    // Convert Date objects to ISO strings
    const formattedGalleryImages = galleryImages.map((image) => ({
      ...image,
      uploadedAt: formatISO(new Date(image.uploadedAt)),
      createdAt: formatISO(new Date(image.createdAt)),
      updatedAt: formatISO(new Date(image.updatedAt)),
    }));

    return {
      carouselEvents,
      officeBearers,
      magazines,
      galleryImages: formattedGalleryImages,
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
