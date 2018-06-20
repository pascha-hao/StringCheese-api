import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Payment } from '../models/payment';
export declare class PaymentRepository extends DefaultCrudRepository<Payment, typeof Payment.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
