import { PgCustomerRepository } from "../customer/infrastructure/PgCustomerRepository";
import { PgRedemptionRepository } from "../redemptions/infrastructure/PgRedemptionRepository";
import { RewardController } from "./controllers/RewardController";
import { PgRewardRepository } from "./infrastructure/PgRewardRepository";
import { RewardRedeemUseCase } from "./usecases/RedeemUseCase";

export const rewardContainer = {
    controller() {
        const rewardRepo = new PgRewardRepository();
        const redeemtionRepo = new PgRedemptionRepository();
        const customerRepo = new PgCustomerRepository();
        const redeemUC = new RewardRedeemUseCase(rewardRepo, redeemtionRepo, customerRepo);

        return new RewardController(redeemUC);
    }
}