import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { PaymentMethod } from '../models/payment-methods';
export declare class PaymentMethodsRepository extends DefaultCrudRepository<PaymentMethod, typeof PaymentMethod.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
