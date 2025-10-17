import { Router } from 'express';
import { mainContainer } from '../../../app/main-container';
import { authMiddleware } from '../../../middleware/authMiddleware';

export const createRewardRoutes = (): Router => {
  const router = Router();
  const rewardCtrl = mainContainer.reward.controller();

  router.post('/:id/redeem', authMiddleware, (req, res, next) => 
    rewardCtrl.redeem(req, res).catch(next)
  );

  return router;
};