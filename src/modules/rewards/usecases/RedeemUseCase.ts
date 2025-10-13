import { ICustomerRepository } from "../../customer/repositories/ICustomerRepository";
import { IRedeemTionRepository } from "../../redemptions/repositories/IRedeemRepository";
import { IRewardRepository } from "../repositories/IRewardRepository";

export class RewardRedeemUseCase {
    constructor(
        private rewardRepository: IRewardRepository,
        private redeemtionRepository: IRedeemTionRepository,
        private customerRepository: ICustomerRepository
    ) {}

    async execute(input: {customerId:string, rewardId:string}) {
        const reward = await this.rewardRepository.getById(input.rewardId);
        if (!reward) {
            throw new Error("Reward not found");
        }

        const customer = await this.customerRepository.findById(input.customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }

        return this.redeemtionRepository.redeem(input);
    }
}