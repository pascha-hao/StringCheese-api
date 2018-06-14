import { Entity } from '@loopback/repository';
export declare class Address extends Entity {
    address_id?: number;
    addressline: string;
    country: string;
    state: string;
    zipcode: string;
    getId(): any;
}
