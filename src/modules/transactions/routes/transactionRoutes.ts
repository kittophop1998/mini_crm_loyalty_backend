import { Router } from 'express';
import { mainContainer } from '../../../app/main-container';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const createTransactionRoutes = (): Router => {
  const router = Router();
  const transactionCtrl = mainContainer.transaction.controller();

  router.post('/', authMiddleware, (req, res, next) => 
    transactionCtrl.addPoint(req, res).catch(next)
  );
  
  router.get('/', authMiddleware, (req, res, next) => 
    transactionCtrl.getAll(req, res).catch(next)
  );

  return router;
};