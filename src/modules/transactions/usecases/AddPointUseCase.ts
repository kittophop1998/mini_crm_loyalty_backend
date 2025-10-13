import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class AddPointUseCase {
    constructor(
        private customerRepo: ITransactionRepository
    ) { }

    async execute(input: { customerId: string; amount: number }) {
        const earnedPoints = Math.floor(input.amount / 10); // ตัวอย่าง: ใช้ 1 point / 10 บาท

        await this.customerRepo.addPoint(input.customerId, input.amount, earnedPoints);
    }
}