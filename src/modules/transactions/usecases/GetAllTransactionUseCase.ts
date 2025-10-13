import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class GetAllTransactionUseCase {
    constructor(
        private transactionRepo: ITransactionRepository
    ) { }

    async execute() {
        return await this.transactionRepo.getAll();
    }
}