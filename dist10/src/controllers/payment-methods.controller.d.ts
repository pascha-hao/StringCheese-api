import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
export declare class PaymentMethodsController {
    private paymentRepo;
    constructor(paymentRepo: PaymentMethodsRepository);
    getPaymentMethod(): Promise<PaymentMethod[]>;
    createPayment(payment: PaymentMethod, jwt: string): Promise<any>;
    getAllPaymentMethods(): Promise<Array<PaymentMethod>>;
    getPaymentMethodsByID(id: number): Promise<PaymentMethod>;
}
