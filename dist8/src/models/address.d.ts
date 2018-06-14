import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    id?: number;
    user_id?: number;
    addressLine: string;
    country: string;
    state: string;
    zipCode: string;
    phoneNum: string;
    getAddressId(): number | undefined;
}
