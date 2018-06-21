import { Entity } from '@loopback/repository';
export declare class Post extends Entity {
    id?: number;
    charity_id: number;
    user_id: number;
    getId(): number | undefined;
}
