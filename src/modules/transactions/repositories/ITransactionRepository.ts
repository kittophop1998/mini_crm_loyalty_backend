import { Transaction } from "../entities/Transaction";


export interface ITransactionRepository {
    addPoint(customerId: string, amount: number, earnedPoints:number): Promise<void>;
    getAll(): Promise<Transaction[]>;
}