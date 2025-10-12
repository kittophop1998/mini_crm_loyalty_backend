import { prisma } from "../../../config/prisma";
import { redis } from "../../../config/redis";
import { Customer } from "../entities/Customer";
import { ICustomerRepository } from "../repositories/ICustomerRepository";

export class PgCustomerRepository implements ICustomerRepository {
    async create(customer: Customer): Promise<Customer> {
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

    async findAll(): Promise<Customer[] | null> {
        const allUsersKey = `user:all`;
    
        // 1️⃣ เช็ก cache
        const cached = await redis.get(allUsersKey);
        if (cached) {
            console.log('🟢 Returning users from Redis cache');
            const cachedUsers = JSON.parse(cached) as any[];
            // map เป็น instance ของ class Customer
            return cachedUsers.map(user => new Customer(user.id, user.name, user.phone, user.createdAt));
        }
    
        // 2️⃣ query DB
        const result = await prisma.customer.findMany();
    
        if (!result || result.length === 0) return null;
    
        // 3️⃣ เก็บ cache
        await redis.set(allUsersKey, JSON.stringify(result), 'EX', 60 * 5);
    
        // 4️⃣ map เป็น class Customer
        return result.map(user => new Customer(user.id, user.name, user.phone, user.createdAt));
    }    
}