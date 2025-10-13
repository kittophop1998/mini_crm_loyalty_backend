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

        return new Customer(result.id, result.name, result.phone, result.totalPoints);
    }

    async findById(id: string): Promise<Customer | null> {
        const result = await prisma.customer.findUnique({
            where: { id },
            include: { points: true } // Use include only
        });

        if (!result) return null;

        const totalPoints = result.points.reduce((sum, p) => sum + p.points, 0);
        const pointsHistory: any = result.points.map(p => ({
            id: p.id,
            points: p.points,
            type: 'earn', // หรือเพิ่ม type ถ้า schema มี
            referenceId: undefined,
            createdAt: p.createdAt
        }));

        return new Customer(
            result.id,
            result.name,
            result.phone,
            totalPoints,
            pointsHistory
        );
    }

    async findAll(): Promise<Customer[] | null> {
        const allUsersKey = `user:all`;

        // 1️⃣ เช็ก cache
        const cached = await redis.get(allUsersKey);
        if (cached) {
            console.log('🟢 Returning users from Redis cache');
            const cachedUsers = JSON.parse(cached) as any[];
            return cachedUsers.map(user =>
                new Customer(
                    user.id,
                    user.name,
                    user.phone,
                    user.totalPoints || 0,
                    user.points || []
                )
            );
        }

        // 2️⃣ query DB
        const result = await prisma.customer.findMany({
            include: { points: true } // include points history
        });

        if (!result || result.length === 0) return null;

        // 3️⃣ แปลง result เป็น Customer instances พร้อม totalPoints
        const customers: Customer[] = result.map(customer => {
            const pointsHistory: any = customer.points.map(p => ({
                id: p.id,
                points: p.points,
                type: 'earn', // ถ้า schema มี type จริง ๆ ให้ใช้ field type
                referenceId: undefined,
                createdAt: p.createdAt
            }));

            const totalPoints = pointsHistory.reduce((sum: any, p: any) => sum + p.points, 0);

            return new Customer(
                customer.id,
                customer.name,
                customer.phone,
                totalPoints,
                pointsHistory
            );
        });

        // 4️⃣ เก็บ cache (serialize)
        await redis.set(allUsersKey, JSON.stringify(customers), 'EX', 60 * 5);

        return customers;
    }

    async findByPhone(phone: string): Promise<Customer | null> {
        const result = await prisma.customer.findUnique({
            where: { phone },
            include: { points: true } // Use include only
        });

        if (!result) return null;

        const totalPoints = result.points.reduce((sum, p) => sum + p.points, 0);
        const pointsHistory: any = result.points.map(p => ({
            id: p.id,
            points: p.points,
            type: 'earn', // หรือเพิ่ม type ถ้า schema มี
            referenceId: undefined,
            createdAt: p.createdAt
        }));

        return new Customer(
            result.id,
            result.name,
            result.phone,
            totalPoints,
            pointsHistory
        );
    }
}