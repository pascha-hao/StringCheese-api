import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Donation } from '../models/donation';
export declare class DonationRepository extends DefaultCrudRepository<Donation, typeof Donation.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
