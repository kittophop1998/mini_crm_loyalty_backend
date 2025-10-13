import { IRepository } from "../../../shared/repositories/IRepository";
import { Customer } from "../entities/Customer";

export interface ICustomerRepository extends IRepository<Customer> {
    findAll(): Promise<Customer[] | null>;
    findById(id: string): Promise<Customer | null>
}