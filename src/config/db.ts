import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/mini_crm"
});
