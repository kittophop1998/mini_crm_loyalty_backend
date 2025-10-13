export class Redeemtion {
    constructor(
        public id: string,
        public customerId: string,
        public rewardId: string,
        public createdAt: Date = new Date()
    ) {}
}