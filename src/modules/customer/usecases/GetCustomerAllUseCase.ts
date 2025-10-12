import { ICustomerRepository } from "../repositories/ICustomerRepository";

export class GetCustomerAllUseCase {
    constructor(private customerRepo: ICustomerRepository) { }

    async execute() {
        const customers = await this.customerRepo.findAll();
        return customers;
    }
}