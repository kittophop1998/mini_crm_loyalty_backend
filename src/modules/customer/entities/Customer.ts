import { LoyaltyPoint } from "@prisma/client";
import { BaseEntity } from "../../../shared/entities/BaseEntity";

export class Customer extends BaseEntity {
    constructor(
        id: string,
        public name: string,
        public phone: string,
        public totalPoints: number = 0,
        public points: LoyaltyPoint[] = [],
        createdAt?: Date,
    ) {
        super(id, createdAt);
    }

    validate() {
        if (!this.name || this.name.trim().length === 0) throw new Error('name is required');
        if (!/^\+?\d{7,15}$/.test(this.phone)) throw new Error('invalid phone');
    }
}