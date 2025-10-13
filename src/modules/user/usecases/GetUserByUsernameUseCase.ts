import { IUserRepository } from "../repositories/IUserRepository";

export class GetUserByUsernameUseCase {
    constructor(
        private userRepo:IUserRepository
    ) {}

    async execute(username: string) {
        const user = await this.userRepo.findByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}