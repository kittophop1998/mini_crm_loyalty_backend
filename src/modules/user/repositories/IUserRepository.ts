import { IRepository } from '../../../shared/repositories/IRepository';
import { User } from '../entities/User';


export interface IUserRepository extends IRepository<User> {
    findByPhone(phone: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}