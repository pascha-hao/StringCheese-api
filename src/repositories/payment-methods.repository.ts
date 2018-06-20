import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { PaymentMethod } from '../models/payment-methods';

export class PaymentMethodsRepository extends DefaultCrudRepository<
    PaymentMethod,
    typeof PaymentMethod.prototype.id
> {
    constructor(@inject('datasources.db') protected datasource: DataSource){
        super(PaymentMethod, datasource);
    }
}