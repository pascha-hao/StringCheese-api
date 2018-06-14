import { Entity } from '@loopback/repository';
export declare class Post extends Entity {
    post_id?: number;
    name: string;
    description: string;
    postimg: string;
    getId(): any;
}
