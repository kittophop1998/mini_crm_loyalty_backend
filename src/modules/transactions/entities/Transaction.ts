export class Transaction {
    constructor(
        public id: string,
        public customerId: string,
        public amount: number,
        public earnedPoints: number,
        public createdAt: Date,
    ) { }

    validate() {
        if (this.amount <= 0) throw new Error("Amount must be greater than zero");
        if (this.earnedPoints < 0) throw new Error("Earned points cannot be negative");
    }
}