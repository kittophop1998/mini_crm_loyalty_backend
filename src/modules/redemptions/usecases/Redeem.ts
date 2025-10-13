export class Redeem {
    constructor(
        private redemptionRepository: any
    ) {}

    async execute(data: any) {
        return this.redemptionRepository.redeem(data);
    }
}