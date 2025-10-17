import { Router } from "express";
import { createAuthRoutes } from "../modules/auth/routes/authRoutes";
import { createUserRoutes } from "../modules/user/routes/userRoutes";
import { createCustomerRoutes } from "../modules/customer/routes/customerRoutes";
import { createTransactionRoutes } from "../modules/transactions/routes/transactionRoutes";
import { createRewardRoutes } from "../modules/rewards/routes/rewardRoutes";

export const createRouter = (): Router => {
    const router = Router();

    // Health check endpoint
    router.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });

    // Mount route modules
    router.use('/auth', createAuthRoutes());
    router.use('/users', createUserRoutes());
    router.use('/customers', createCustomerRoutes());
    router.use('/transactions', createTransactionRoutes());
    router.use('/rewards', createRewardRoutes());

    return router;
};