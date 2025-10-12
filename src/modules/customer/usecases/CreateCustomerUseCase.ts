import { ulid } from "ulid";
import { ICustomerRepository } from "../repositories/ICustomerRepository";
import { Customer } from "../entities/Customer";

export class CreateCustomerUserCase {
    constructor(private customerRepo: ICustomerRepository) { }

    async execute(input: { name: string; phone: string }) {
        const id = ulid();
        const customer = new Customer(id, input.name, input.phone);
        customer.validate();

        const existing = await this.customerRepo.findByPhone(input.phone);
        if (existing) throw new Error('customer with phone already exists');

        return this.customerRepo.create(customer);
    }
}