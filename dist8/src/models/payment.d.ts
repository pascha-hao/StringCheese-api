import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    id?: number;
    cardNumber: number;
    user_id: number;
    cardHolderName: string;
    CVV: string;
    cardType: string;
    expirationDate: string;
    address_id: number;
    getPaymentMethodId(): number | undefined;
}
