import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// We guarantee DATABASE_URL is defined because we added it to .env
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
