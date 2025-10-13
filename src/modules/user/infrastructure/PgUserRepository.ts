import type { IUserRepository } from '../repositories/IUserRepository.js';
import { User } from '../entities/User';
import { prisma } from '../../../config/prisma';


export class PgUserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        const result = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                username: user.username,
                createdAt: user.createdAt,
            },
        });

        return new User(result.id, result.name, result.phone, result.username, result.createdAt);
    }


    async findById(id: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { id },
        });

        if (!result) return null;

        return new User(result.id, result.name, result.phone, result.username, result.createdAt);
    }


    async findByPhone(phone: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { phone },
        });

        if (!result) return null;

        return new User(result.id, result.name, result.phone, result.username , result.createdAt);
    }

    async findByUsername(username: string): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { username },
        });

        if (!result) return null;

        return new User(result.id, result.name, result.phone, result.username, result.createdAt);
    }
}