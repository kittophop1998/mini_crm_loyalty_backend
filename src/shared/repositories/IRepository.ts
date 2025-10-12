export interface IRepository<T> {
    create(entity: T): Promise<T>;
    findById(id: string): Promise<T | null>;
}