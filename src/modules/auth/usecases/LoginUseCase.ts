import { signToken } from "../../../utils/jwt";
import { IUserRepository } from "../../user/repositories/IUserRepository";

export class LoginUseCase {
    constructor(
        private userRepo: IUserRepository
    ) { }

    async execute(username: string, password: string) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = user.phone === password; // Simplified for demonstration
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Assuming signToken is a function that generates JWT tokens
        const token = signToken({ userId: user.id, phone: user.phone });
        return { token, user };
    }
}