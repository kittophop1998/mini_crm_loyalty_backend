import { Router } from 'express';
import { mainContainer } from '../../../app/main-container';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const createCustomerRoutes = (): Router => {
  const router = Router();
  const customerCtrl = mainContainer.customer.controller();

  router.post('/', authMiddleware, (req, res, next) => 
    customerCtrl.create(req, res).catch(next)
  );
  
  router.get('/:id', authMiddleware, (req, res, next) => 
    customerCtrl.findById(req, res).catch(next)
  );
  
  router.get('/', authMiddleware, (req, res, next) => 
    customerCtrl.getAll(req, res).catch(next)
  );

  return router;
};