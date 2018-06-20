import { Entity } from '@loopback/repository';
export declare class PaymentMethod extends Entity {
    id?: number;
    cardholder: string;
    paymenttoken: string;
    amount: number;
    curency: string;
    userID: number;
    date: Date;
    getId(): number | undefined;
}
