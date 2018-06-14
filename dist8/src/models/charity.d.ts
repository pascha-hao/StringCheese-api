import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    charity_id?: number;
    name: string;
    description: string;
    charitycardimg: string;
    website: string;
    logo: string;
    getId(): any;
}
