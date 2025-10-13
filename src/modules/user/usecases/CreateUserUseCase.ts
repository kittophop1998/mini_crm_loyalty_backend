import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../entities/User';
import { ulid } from 'ulid';


export class CreateUserUseCase {
    constructor(private userRepo: IUserRepository) { }

    async execute(input: { name: string; phone: string, username: string }): Promise<User> {
        const id = ulid();
        const user = new User(id, input.name, input.phone, input.username);
        user.validate();

        const existing = await this.userRepo.findByPhone(user.phone);
        if (existing) throw new Error('user with phone already exists');


        return this.userRepo.create(user);
    }
}