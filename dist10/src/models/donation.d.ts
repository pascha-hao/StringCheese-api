import { Entity } from '@loopback/repository';
export declare class Donation extends Entity {
    id?: number;
    user_id: number;
    charity_id: number;
    charity_name: string;
    amount: number;
    is_subscription: boolean;
    getDonationId(): number | undefined;
}
