import { prisma } from "../../../config/prisma";
import { Reward } from "../entities/reward";
import { IRewardRepository } from "../repositories/IRewardRepository";

export class PgRewardRepository implements IRewardRepository {
    async getById(id:string): Promise<Reward | null> {
        const result = await prisma.reward.findUnique({
            where: { id }
        });

        if (!result) return null;

        return new Reward(result.id, result.name, result.pointCost);
    }
}