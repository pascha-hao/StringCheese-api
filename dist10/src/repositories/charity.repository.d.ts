import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Charity } from '../models/charity';
export declare class CharityRepository extends DefaultCrudRepository<Charity, typeof Charity.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
