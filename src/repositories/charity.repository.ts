
import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Charity } from '../models/charity';

export class CharityRepository extends DefaultCrudRepository<
  Charity,
  typeof Charity.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Charity, datasource);
  }
}