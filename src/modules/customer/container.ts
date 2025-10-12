import { CustomerController } from "./controllers/CustomerController";
import { PgCustomerRepository } from "./infrastructure/PgCustomerRepository"
import { CreateCustomerUserCase } from "./usecases/CreateCustomerUseCase";
import { GetCustomerUseCase } from "./usecases/GetCustomerUseCase";

export const customerContainer = {
    controller() {
        const repo = new PgCustomerRepository();
        const createUC = new CreateCustomerUserCase(repo);
        const getUC = new GetCustomerUseCase(repo);

        return new CustomerController(createUC, getUC);
    }
}