import { Router } from 'express';
import { mainContainer } from '../../../app/main-container';

export const createUserRoutes = (): Router => {
  const router = Router();
  const userCtrl = mainContainer.user.controller();

  router.post('/', (req, res, next) => 
    userCtrl.create(req, res).catch(next)
  );
  
  router.get('/:id', (req, res, next) => 
    userCtrl.get(req, res).catch(next)
  );

  return router;
};