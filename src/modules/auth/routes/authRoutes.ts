import { Router } from 'express';
import { modernContainer } from '../../../app/modern-container';

export const createAuthRoutes = (): Router => {
  const router = Router();
  const authCtrl = modernContainer.auth.controller();

  router.post('/login', (req, res, next) => authCtrl.login(req, res).catch(next));
  router.post('/register', (req, res, next) => authCtrl.register(req, res).catch(next));

  return router;
};