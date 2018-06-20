import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Payment } from '../models/payment';

export class PaymentRepository extends DefaultCrudRepository<
  Payment,
  typeof Payment.prototype.id
> {
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Payment, datasource);
  }
}