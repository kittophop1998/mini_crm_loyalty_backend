import { Reward } from "../entities/reward";

export interface IRewardRepository {
    getById(id:string): Promise<Reward | null>
}