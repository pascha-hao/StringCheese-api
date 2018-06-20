import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { Payment } from "../models/payment";
import { PaymentRepository } from "../repositories/payment.repository";
import { StripeToken } from "../models/stripetoken";
import { sign, verify } from 'jsonwebtoken';

export class PaymentController {
  constructor(
    @repository(PaymentRepository.name) private paymentRepo: PaymentRepository
  ) { }

  @get('/payment')
  async findPayment(): Promise<Payment[]> {
    return await this.paymentRepo.find();
  }

  @post('/payment')
  async createPayment(@requestBody() payment: Payment) {
    return await this.paymentRepo.create(payment);
  }

  @post('/stripepayment')
  async createStripePayment(@requestBody() stripeToken: StripeToken) {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_PT8I5dfDT3DyisRxL6d4fTVM");

    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = stripeToken.id; // Using Express
    const charge = stripe.charges.create({
      amount: stripeToken.amount,
      currency: 'usd',
      description: 'Example charge',
      source: token,
      metadata: { order_id: 6735 },
    });

    return charge;
  }

  //Passing user information
  @get('/me')
  async getUserInformation(@param.query.string('jwt') jwt: string): Promise<any> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
      var jwtBody = verify(jwt, 'shh') as any;
      console.log(jwtBody);
      return jwtBody.user;
    } catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }
  }

}