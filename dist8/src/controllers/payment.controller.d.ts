import { Payment } from "../models/payment";
import { PaymentRepository } from "../repositories/payment.repository";
import { StripeToken } from "../models/stripetoken";
export declare class PaymentController {
    private paymentRepo;
    constructor(paymentRepo: PaymentRepository);
    findPayment(): Promise<Payment[]>;
    createPayment(payment: Payment): Promise<Payment>;
    createStripePayment(stripeToken: StripeToken): Promise<any>;
    getUserInformation(jwt: string): Promise<any>;
}
