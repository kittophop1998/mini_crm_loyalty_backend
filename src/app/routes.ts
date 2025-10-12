import { Router } from "express";
import { mainContainer } from "./main-container";


export const createRouter = () => {
    const r = Router();

    // User routes
    const userCtrl = mainContainer.user.controller();
    r.post('/users', (req, res) => userCtrl.create(req, res));
    r.get('/users/:id', (req, res) => userCtrl.get(req, res));

    // Customer routes
    const customerCtrl = mainContainer.customer.controller();
    r.post('/customers', (req, res) => customerCtrl.create(req, res));
    r.get('/customers/:id', (req, res) => customerCtrl.get(req, res));

    return r;
};