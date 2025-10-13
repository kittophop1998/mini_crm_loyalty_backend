import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../../utils/response";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { RewardRedeemUseCase } from "../usecases/RedeemUseCase";

export class RewardController {
    constructor(
        private rewardRedeemUseCase: RewardRedeemUseCase
    ) { }

    async redeem(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await this.rewardRedeemUseCase.execute({ ...req.body, rewardId: id });

            return successResponse(res, result, 'Reward redeemed successfully', HTTP_STATUS.OK);
        } catch (err) {
            return errorResponse(res, 'Internal Server Error', HTTP_STATUS.INTERNAL_SERVER_ERROR, (err as Error).message);
        }
    }
}