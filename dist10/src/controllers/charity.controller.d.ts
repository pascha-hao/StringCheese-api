import { CharityRepository } from "../repositories/charity.repository";
import { ProjectRepository } from "../repositories/project.repository";
import { Charity } from "../models/charity";
import { Project } from "../models/project";
export declare class CharityController {
    private charityRepo;
    private projectRepo;
    constructor(charityRepo: CharityRepository, projectRepo: ProjectRepository);
    register(charity: Charity): Promise<Charity>;
    getAllCharities(): Promise<Array<Charity>>;
    findCharitiesById(id: number): Promise<Charity>;
    getAllProjects(): Promise<Array<Project>>;
}
