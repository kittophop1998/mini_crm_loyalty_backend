import { prisma } from "../../../config/prisma";
import { Transaction } from "../entities/Transaction";
import { ITransactionRepository } from "../repositories/ITransactionRepository";

export class PgTransactionRepository implements ITransactionRepository {
  async addPoint(customerId: string, amount: number, earnedPoints: number): Promise<void> {
    // ตรวจสอบว่ามี customer จริงหรือไม่
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) throw new Error("Customer not found");

    // ใช้ Prisma Transaction ให้ Atomic
    await prisma.$transaction(async (tx) => {
      await tx.transaction.create({
        data: { customerId, amount, pointsEarned: earnedPoints },
      });

      await tx.loyaltyPoint.create({
        data: { customerId, points: earnedPoints },
      });
    });

    // รวมแต้มทั้งหมด
    const total = await prisma.loyaltyPoint.aggregate({
      where: { customerId },
      _sum: { points: true },
    });

    console.log(`✅ Added ${earnedPoints} points to customer ${customerId}`);
    console.log(`🎯 Total points: ${total._sum.points ?? 0}`);
  }

  async getAll(): Promise<Transaction[]> {
    const result = await prisma.transaction.findMany({
        orderBy: { createdAt: "desc" },
        include: { customer: true },
    });

    return result.map((t) => new Transaction(
        t.id,
        t.customerId,
        t.amount,
        t.pointsEarned,
        t.createdAt,
    ));
  }
}
