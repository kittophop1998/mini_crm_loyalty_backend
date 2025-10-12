import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createRouter } from './routes';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';

dotenv.config();

const app = express();
app.use(express.json());

// -----------------------
// CORS
// -----------------------
app.use(cors({
    origin: process.env.CORS_ORIGIN ?? '*', // ตัวอย่าง: 'http://localhost:3001'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

// -----------------------
// Rate Limiting
// -----------------------
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 นาที
    max: 100, // 100 requests ต่อ IP ต่อ window
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// -----------------------
// Routes
// -----------------------
app.use('/api/v1', createRouter());

// -----------------------
// Start Server
// -----------------------
const port = Number(process.env.PORT ?? 3000);

async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ Prisma DB connected');

        // 2️⃣ Connect Redis
        await redis.ping(); // เรียก ping เพื่อเช็ค connection
        console.log('✅ Redis connected');

        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('❌ DB not ready:', err);
        process.exit(1);
    }
}

startServer();
