import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    payment_id?: number;
    user_id1: number;
    address_id1: number;
    card_number: number;
    expiration_date: number;
    bank: string;
    CVV: number;
}
