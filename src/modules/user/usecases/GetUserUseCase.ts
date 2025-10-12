import { IUserRepository } from '../repositories/IUserRepository';


export class GetUserUseCase {
    constructor(private userRepo: IUserRepository) { }

    async execute(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new Error('user not found');
        return user;
    }
}