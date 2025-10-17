import { container } from '../shared/container/DIContainer';
import { TYPES } from '../shared/container/types';
import { setupContainer } from '../shared/container/setup';

// Initialize the DI container
setupContainer();

export const modernContainer = {
  customer: {
    controller: () => container.resolve(TYPES.CustomerController)
  },
  auth: {
    controller: () => container.resolve(TYPES.AuthController)
  },
  // Add other modules as they are converted
  user: {
    controller: () => {
      // Fallback to old container for now
      const { userContainer } = require('../modules/user/container');
      return userContainer.controller();
    }
  },
  transaction: {
    controller: () => {
      const { transactionContainer } = require('../modules/transactions/container');
      return transactionContainer.controller();
    }
  },
  reward: {
    controller: () => {
      const { rewardContainer } = require('../modules/rewards/container');
      return rewardContainer.controller();
    }
  },
  redemption: {
    controller: () => {
      const { redemptionContainer } = require('../modules/redemptions/container');
      return redemptionContainer.controller();
    }
  },
  loyalty: {
    controller: () => {
      const { loyaltyContainer } = require('../modules/loyalty/container');
      return loyaltyContainer.controller();
    }
  }
};