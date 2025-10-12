import { IRepository } from "../../../shared/repositories/IRepository";
import { Customer } from "../entities/Customer";

export interface ICustomerRepository extends IRepository<Customer> {
    findByPhone(phone: string): Promise<Customer | null>;
}