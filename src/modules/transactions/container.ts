import { TransactionController } from "./controllers/TransactionController"
import { GetAllTransactionUseCase } from "./usecases/GetAllTransactionUseCase";
import { AddPointUseCase } from "./usecases/AddPointUseCase";
import { PgTransactionRepository } from "./infrastructure/PgTransactionRepository"; // Changed casing

export const transactionContainer = {
    controller() {
        const repo = new PgTransactionRepository();
        const addPointUC = new AddPointUseCase(repo);
        const getAllUC = new GetAllTransactionUseCase(repo);

        return new TransactionController(addPointUC, getAllUC);
    }
}