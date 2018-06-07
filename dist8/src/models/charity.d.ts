import { Entity } from '@loopback/repository';
export declare class Charity extends Entity {
    id?: number;
    name: string;
    slogan: string;
    description: string;
    getId(): number | undefined;
}
