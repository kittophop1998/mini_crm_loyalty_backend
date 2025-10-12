import { prisma } from "../../../config/prisma";
import { Customer } from "../entities/Customer";
import { ICustomerRepository } from "../repositories/ICustomerRepository";

export class PgCustomerRepository implements ICustomerRepository {
    async create(customer: Customer):Promise<Customer> {
        const result = await prisma.customer.create({
            data: {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                createdAt: customer.createdAt,
            },
        })

        return new Customer(result.id, result.name, result.phone, result.createdAt);
    }

    async findById(id: string): Promise<Customer | null> {
        const result = await prisma.customer.findUnique({
            where: { id },
        });

        if (!result) return null;

        return new Customer(result.id, result.name, result.phone, result.createdAt);
    }

    async findByPhone(phone: string): Promise<Customer | null> {
        const result = await prisma.customer.findUnique({
            where: { phone },
        })

        if (!result) return null;

        return new Customer(result.id, result.name, result.phone, result.createdAt);
    }
} 0