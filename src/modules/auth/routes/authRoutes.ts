import { Router } from 'express';
import { mainContainer } from '../../../app/main-container';

export const createAuthRoutes = (): Router => {
  const router = Router();
  const authCtrl = mainContainer.auth.controller();

  router.post('/login', (req, res, next) => 
    authCtrl.login(req, res).catch(next)
  );
  
  router.post('/register', (req, res, next) => 
    authCtrl.register(req, res).catch(next)
  );

  return router;
};