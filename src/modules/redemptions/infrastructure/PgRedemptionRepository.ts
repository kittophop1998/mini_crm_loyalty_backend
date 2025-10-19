import { create } from "domain";
import { prisma } from "../../../config/prisma";
import { Redeemtion } from "../entities/Redeem";

export class PgRedemptionRepository {
    async redeem(data: {customerId:string, rewardId:string}): Promise<Redeemtion> {
        const result = await prisma.redemption.create({
            data: {
                customerId: data.customerId,
                rewardId: data.rewardId,
                createdAt: new Date()
            }
        });

        return new Redeemtion(result.id, result.customerId, result.rewardId, result.createdAt);
    }
} 