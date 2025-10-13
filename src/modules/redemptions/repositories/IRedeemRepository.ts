import { Redeemtion } from "../entities/Redeem";

export interface IRedeemTionRepository {
    redeem(data: {customerId:string, rewardId:string}): Promise<Redeemtion>;
}