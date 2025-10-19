import { container } from '../shared/container/DIContainer';
import { TYPES } from '../shared/container/types';
import { setupContainer } from '../shared/container/setup';
import { AuthController } from '../modules/auth/controllers/AuthController';
import { CustomerController } from '../modules/customer/controllers/CustomerController';
import { UserController } from '../modules/user/controllers/UserController';
import { TransactionController } from '../modules/transactions/controllers/TransactionController';
import { RewardController } from '../modules/rewards/controllers/RewardController';
import { RedemptionController } from '../modules/redemptions/controllers/RedeemtionController';

// Initialize the DI container
setupContainer();

export const modernContainer = {
  customer: {
    controller: () => container.resolve<CustomerController>(TYPES.CustomerController)
  },
  auth: {
    controller: () => container.resolve<AuthController>(TYPES.AuthController)
  },
  user: {
    controller: () => container.resolve<UserController>(TYPES.UserController)
  },
  transaction: {
    controller: () => container.resolve<TransactionController>(TYPES.TransactionController)
  },
  reward: {
    controller: () => container.resolve<RewardController>(TYPES.RewardController)
  },
  redemption: {
    controller: () => container.resolve<RedemptionController>(TYPES.RedemptionController)
  },
};