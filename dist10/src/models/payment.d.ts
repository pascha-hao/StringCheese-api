import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    id?: number;
    address_id: number;
    cardNumber: number;
    cardMonth: number;
    cardYear: number;
    cardCVV: number;
    getPaymentMethodId(): number | undefined;
}
