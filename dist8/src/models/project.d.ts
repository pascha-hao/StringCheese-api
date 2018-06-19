import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    id?: number;
    title: string;
    charity_id: number;
    description: string;
    projectimg: string;
    getId(): number | undefined;
}
