import { Router } from "express";
import { mainContainer } from "./main-container";
import { authMiddleware } from "../middleware/authMiddleware";


export const createRouter = () => {
    const r = Router();

    // Auth routes
    const authCtrl = mainContainer.auth.controller();
    r.post('/auth/login', (req, res) => authCtrl.login(req, res));
    r.post('/auth/register', (req, res) => authCtrl.register(req, res));

    // User routes
    const userCtrl = mainContainer.user.controller();
    r.post('/users', (req, res) => userCtrl.create(req, res));
    r.get('/users/:id', (req, res) => userCtrl.get(req, res));

    // Customer routes
    const customerCtrl = mainContainer.customer.controller();
    r.post('/customers', authMiddleware, (req, res) => customerCtrl.create(req, res));
    r.get('/customers/:id', authMiddleware, (req, res) => customerCtrl.findById(req, res));
    r.get('/customers', authMiddleware, (req, res) => customerCtrl.getAll(req, res));

    // Transaction routes
    const transactionCtrl = mainContainer.transaction.controller();
    r.post('/transactions', authMiddleware, (req, res) => transactionCtrl.addPoint(req, res));
    r.get('/transactions', authMiddleware, (req, res) => transactionCtrl.getAll(req, res));

    // Loyalty routes
    const loyaltyCtrl = mainContainer.loyalty.controller();

    // Redemption routes
    const redemptionCtrl = mainContainer.redemption.controller();

    // Reward routes
    const rewardCtrl = mainContainer.reward.controller();
    r.post('/rewards/:id/redeem', authMiddleware, (req, res) => rewardCtrl.redeem(req, res));

    return r;
};