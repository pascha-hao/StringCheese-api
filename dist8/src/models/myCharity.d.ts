import { Entity } from '@loopback/repository';
export declare class MyCharity extends Entity {
    id?: number;
    name: string;
    percent: number;
    userID: number;
}
