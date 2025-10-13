import { authContainer } from "../modules/auth/container";
import { customerContainer } from "../modules/customer/container";
import { LoyaltyContainer } from "../modules/loyalty/container";
import { redemptionContainer } from "../modules/redemptions/container";
import { rewardContainer } from "../modules/rewards/container";
import { transactionContainer } from "../modules/transactions/container";
import { userContainer } from "../modules/user/container";


export const mainContainer = {
    user: userContainer,
    customer: customerContainer,
    auth: authContainer,
    loyalty: LoyaltyContainer,
    transaction: transactionContainer,
    redemption: redemptionContainer,
    reward: rewardContainer
};