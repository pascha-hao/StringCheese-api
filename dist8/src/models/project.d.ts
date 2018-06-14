import { Entity } from '@loopback/repository';
export declare class Project extends Entity {
    project_id?: number;
    title: string;
    description: string;
    projectimg: string;
    getId(): any;
}
