import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Donation } from '../models/donation';

export class DonationRepository extends DefaultCrudRepository<
  Donation,
  typeof Donation.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Donation, datasource);
  }
}