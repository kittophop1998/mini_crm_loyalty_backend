import { customerContainer } from "../modules/customer/container";
import { userContainer } from "../modules/user/container";


export const mainContainer = {
    user: userContainer,
    customer: customerContainer
};