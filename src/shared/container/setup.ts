import { container } from './DIContainer';
import { TYPES } from './types';

// Import repositories
import { PgCustomerRepository } from '../../modules/customer/infrastructure/PgCustomerRepository';
import { PgUserRepository } from '../../modules/user/infrastructure/PgUserRepository';

// Import use cases
import { CreateCustomerUserCase } from '../../modules/customer/usecases/CreateCustomerUseCase';
import { GetCustomerUseCase } from '../../modules/customer/usecases/GetCustomerUseCase';
import { GetCustomerAllUseCase } from '../../modules/customer/usecases/GetCustomerAllUseCase';
import { LoginUseCase } from '../../modules/auth/usecases/LoginUseCase';
import { CreateUserUseCase } from '../../modules/user/usecases/CreateUserUseCase';

// Import controllers
import { CustomerController } from '../../modules/customer/controllers/CustomerController';
import { AuthController } from '../../modules/auth/controllers/AuthController';
import { PgTransactionRepository } from '../../modules/transactions/infrastructure/PgTransactionRepository';
import { PgRewardRepository } from '../../modules/rewards/infrastructure/PgRewardRepository';
import { PgRedemptionRepository } from '../../modules/redemptions/infrastructure/PgRedemptionRepository';

export function setupContainer(): void {
  // Register repositories as singletons
  container.registerSingleton(TYPES.CustomerRepository, () => new PgCustomerRepository());
  container.registerSingleton(TYPES.UserRepository, () => new PgUserRepository());
  container.registerSingleton(TYPES.TransactionRepository, () => new PgTransactionRepository());
  container.registerSingleton(TYPES.RewardRepository, () => new PgRewardRepository());
  container.registerSingleton(TYPES.RedemptionRepository, () => new PgRedemptionRepository());

  // Register use cases as transients
  container.registerTransient(TYPES.CreateCustomerUseCase, () => 
    new CreateCustomerUserCase(container.resolve(TYPES.CustomerRepository))
  );
  
  container.registerTransient(TYPES.GetCustomerUseCase, () => 
    new GetCustomerUseCase(container.resolve(TYPES.CustomerRepository))
  );
  
  container.registerTransient(TYPES.GetCustomerAllUseCase, () => 
    new GetCustomerAllUseCase(container.resolve(TYPES.CustomerRepository))
  );

  container.registerTransient(TYPES.LoginUseCase, () => 
    new LoginUseCase(container.resolve(TYPES.UserRepository))
  );

  container.registerTransient(TYPES.CreateUserUseCase, () => 
    new CreateUserUseCase(container.resolve(TYPES.UserRepository))
  );

  // Register controllers as transients
  container.registerTransient(TYPES.CustomerController, () => 
    new CustomerController(
      container.resolve(TYPES.CreateCustomerUseCase),
      container.resolve(TYPES.GetCustomerUseCase),
      container.resolve(TYPES.GetCustomerAllUseCase)
    )
  );

  container.registerTransient(TYPES.AuthController, () => 
    new AuthController(
      container.resolve(TYPES.LoginUseCase),
      container.resolve(TYPES.CreateUserUseCase)
    )
  );
}