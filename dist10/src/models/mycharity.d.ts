import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    donatedByUser: number;
    getId(): number | undefined;
}
