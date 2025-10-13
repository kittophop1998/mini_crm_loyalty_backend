export class Reward {
    constructor(
        public id: string,
        public name: string,
        public pointCost: number,
        public description?: string,
        public createdAt: Date = new Date()
    ) {}
}