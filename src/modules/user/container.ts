import { PgUserRepository } from './infrastructure/PgUserRepository';
import { CreateUserUseCase } from './usecases/CreateUserUseCase';
import { GetUserUseCase } from './usecases/GetUserUseCase';
import { UserController } from './controllers/UserController';


export const userContainer = {
    controller() {
        const repo = new PgUserRepository();
        const createUC = new CreateUserUseCase(repo);
        const getUC = new GetUserUseCase(repo);
        
        return new UserController(createUC, getUC);
    }
};