import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createRouter } from './routes';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { config } from '../config/app';
import { errorHandler } from '../middleware/errorHandler';

const app = express();

// -----------------------
// Middleware Setup
// -----------------------
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: config.cors.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: config.cors.credentials,
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api/v1', createRouter());

// Global Error Handler (should be last)
app.use(errorHandler);

// -----------------------
// Server Startup
// -----------------------
async function startServer() {
    try {
        // Connect to Prisma DB
        await prisma.$connect();
        console.log('✅ Prisma DB connected');

        // Connect to Redis
        await redis.ping();
        console.log('✅ Redis connected');

        // Start the server
        app.listen(config.port, () => {
            console.log(`🚀 Server running at http://localhost:${config.port}`);
            console.log(`🌍 Environment: ${config.nodeEnv}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

startServer();
