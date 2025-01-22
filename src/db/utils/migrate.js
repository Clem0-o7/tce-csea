import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { config } from 'dotenv';

config();

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle(sql);

(async () => {
  try {
    await migrate(db, { migrationsFolder: '@/db/migrations' });
    console.log('Migration successful!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
})();
