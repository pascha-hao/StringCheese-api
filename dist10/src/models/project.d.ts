import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    id?: number;
    title: string;
    description: string;
    projectimg: string;
    getId(): number | undefined;
}
