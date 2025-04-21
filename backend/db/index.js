import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new pkg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const query = (text, params) => pool.query(text, params);
