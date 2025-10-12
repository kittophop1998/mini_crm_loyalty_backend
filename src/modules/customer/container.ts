import { CustomerController } from "./controllers/CustomerController";
import { PgCustomerRepository } from "./infrastructure/PgCustomerRepository"
import { CreateCustomerUserCase } from "./usecases/CreateCustomerUseCase";
import { GetCustomerAllUseCase } from "./usecases/GetCustomerAllUseCase";
import { GetCustomerUseCase } from "./usecases/GetCustomerUseCase";

export const customerContainer = {
    controller() {
        const repo = new PgCustomerRepository();
        const createUC = new CreateCustomerUserCase(repo);
        const getUC = new GetCustomerUseCase(repo);
        const getAllUC = new GetCustomerAllUseCase(repo);

        return new CustomerController(createUC, getUC, getAllUC);
    }
}