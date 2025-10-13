import { PgCustomerRepository } from "../customer/infrastructure/PgCustomerRepository";
import { PgRedeemtionRepository } from "../redemptions/infrastructure/PgRedeemtionRepository";
import { RewardController } from "./controllers/RewardController";
import { PgRewardRepository } from "./infrastructure/PgRewardRepository";
import { RewardRedeemUseCase } from "./usecases/RedeemUseCase";

export const rewardContainer = {
    controller() {
        const rewardRepo = new PgRewardRepository();
        const redeemtionRepo = new PgRedeemtionRepository();
        const customerRepo = new PgCustomerRepository();
        const redeemUC = new RewardRedeemUseCase(rewardRepo, redeemtionRepo, customerRepo);

        return new RewardController(redeemUC);
    }
}