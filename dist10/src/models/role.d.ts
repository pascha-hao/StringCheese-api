import { Entity } from '@loopback/repository';
export declare class Role extends Entity {
    id?: number;
    role: string;
    getId(): number | undefined;
}
