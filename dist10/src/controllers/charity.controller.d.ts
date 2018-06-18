import { CharityRepository } from "../repositories/charity.repository";
import { Charity } from "../models/charity";
export declare class CharityController {
    private charityRepo;
    constructor(charityRepo: CharityRepository);
    register(charity: Charity): Promise<Charity>;
    getAllCharities(): Promise<Array<Charity>>;
    findCharitiesById(id: number): Promise<Charity>;
}
