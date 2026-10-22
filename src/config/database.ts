
import 'dotenv/config';
import { Pool } from 'pg';

console.log('¿Se cargó DB_USER?:', Boolean(process.env.DB_USER));
console.log('¿Se cargó DB_PASSWORD?:', Boolean(process.env.DB_PASSWORD));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

export default pool;
