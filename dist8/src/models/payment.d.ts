import { Entity } from '@loopback/repository';
export declare class Payment extends Entity {
    ccnum: string;
    exp: string;
    cvc: string;
    userID: number;
}
