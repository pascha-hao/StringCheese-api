import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    description: string;
    charitycardimg: string;
    website: string;
    logo: string;
    getId(): number | undefined;
}
