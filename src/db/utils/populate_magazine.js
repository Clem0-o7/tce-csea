//import { db } from './db.js'; // Update this import
import { magazines } from '../schema.js'; // Import from your schema file

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";


// Directly use the provided database URL
const sql = neon(NEXT_PUBLIC_DATABASE_URL);

// Initialize drizzle with the connection
export const db = drizzle({ client: sql });
// Direct Google Drive PDF links
const DIRECT_LINK_PREFIX = 'https://drive.google.com/uc?export=download&id=';

// Seed data for magazines
const magazineData = [
  {
    name: 'Techazine - Empower with artificial intelligence',
    year: 'Nov-2023',
    description: 'A comprehensive exploration of artificial intelligence and its transformative potential',
    pdfUrl: `${DIRECT_LINK_PREFIX}1-R3qUFqB3M8lZpFcDnWL6PYPDlVx9pRz`,
    thumbnailUrl: `${DIRECT_LINK_PREFIX}1_DuK-tQYSbKvZhVqTQVKhUVqCMvcRyuR`,
    in_carousal: true
  },
  {
    name: 'Techazine - Emerging trends in the field of computer science',
    year: '2023',
    description: 'Discover the latest innovations and emerging trends shaping the future of computer science',
    pdfUrl: `${DIRECT_LINK_PREFIX}1TVS6FxhoWmfrsWLi6WP4a7auAAvnWXfi`,
    thumbnailUrl: `${DIRECT_LINK_PREFIX}14SyNzgSO1iYbuLo1BhRJXrSvF00gEO32`,
    in_carousal: false
  }
];

async function seedMagazines() {
  try {
    console.log('Starting magazine seeding...');
    
    // Insert magazines
    const insertedMagazines = await db.insert(magazines)
      .values(magazineData)
      .returning();
    
    console.log(`Inserted ${insertedMagazines.length} magazines successfully:`);
    insertedMagazines.forEach(mag => {
      console.log(`- ${mag.name} (${mag.year})`);
    });
  } catch (error) {
    console.error('Error seeding magazines:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedMagazines().then(() => {
  console.log('Magazine seeding completed.');
  process.exit(0);
});