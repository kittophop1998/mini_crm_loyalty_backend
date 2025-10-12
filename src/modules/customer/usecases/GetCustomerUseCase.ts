import { ICustomerRepository } from "../repositories/ICustomerRepository";

export class GetCustomerUseCase {
    constructor(private customerRepo: ICustomerRepository) { }

    async execute(id: string) {
        const customer = await this.customerRepo.findById(id);
        if (!customer) throw new Error('customer not found');
        return customer;
    }
}