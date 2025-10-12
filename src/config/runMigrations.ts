// src/config/runMigrations.ts
import { pool } from './db';
import fs from 'fs';
import path from 'path';

export async function runMigrations() {
    const migrationPath = path.join(__dirname, '../../src/db/migrations/init.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    try {
        await pool.query(sql);
        console.log('✅ Database initialized (migration applied)');
    } catch (err) {
        console.error('❌ Error running migration:', err);
        throw err;
    }
}
