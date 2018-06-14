import { Entity } from '@loopback/repository';
export declare class Post extends Entity {
    id?: number;
    name: string;
    description: string;
    postimg: string;
    getId(): number | undefined;
}
