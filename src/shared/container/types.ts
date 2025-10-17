// Service identifiers
export const TYPES = {
  // Repositories
  CustomerRepository: Symbol.for('CustomerRepository'),
  UserRepository: Symbol.for('UserRepository'),
  TransactionRepository: Symbol.for('TransactionRepository'),
  RewardRepository: Symbol.for('RewardRepository'),
  RedemptionRepository: Symbol.for('RedemptionRepository'),

  // Use Cases
  CreateCustomerUseCase: Symbol.for('CreateCustomerUseCase'),
  GetCustomerUseCase: Symbol.for('GetCustomerUseCase'),
  GetCustomerAllUseCase: Symbol.for('GetCustomerAllUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),

  // Controllers
  CustomerController: Symbol.for('CustomerController'),
  AuthController: Symbol.for('AuthController'),
  UserController: Symbol.for('UserController'),
  TransactionController: Symbol.for('TransactionController'),
  RewardController: Symbol.for('RewardController'),
  RedemptionController: Symbol.for('RedemptionController'),
} as const;