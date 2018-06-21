// Uncomment these imports to begin using these cool features!
// import {inject} from @loopback/context;
import { repository } from "@loopback/repository";
import { post, get, requestBody, HttpErrors, param } from "@loopback/rest";
import { PaymentMethod } from "../models/payment-methods";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository";
import { verify } from "jsonwebtoken";

export class PaymentMethodsController {
  constructor(@repository(PaymentMethodsRepository.name) private paymentRepo: PaymentMethodsRepository) { }

  @get('/payment-methods')
  async getPaymentMethod(): Promise<PaymentMethod[]> {
    return await this.paymentRepo.find();
  }

  @post('/payment')
  async createPayment(
      @requestBody() payment: PaymentMethod,
      @param.query.string('jwt') jwt: string
  ): Promise<any> {

      // if (!payment.cardholder) {
      //     throw new HttpErrors.BadRequest('Missing required data');
      // }

      var stripe = require("stripe")("pk_test_Wr8cGPVS6aiNLEsuYVi0G1wm");

      // Token is created using Checkout or Elements!
      // Get the payment token ID submitted by the form:
      const token = payment.paymenttoken; // Using Express
      try {
          var jwtBody = verify(jwt, 'shh') as any;

          var storedPayment = new PaymentMethod;
          storedPayment.cardholder = payment.cardholder;
          storedPayment.paymenttoken = payment.paymenttoken;
          storedPayment.amount = payment.amount;
          storedPayment.curency = payment.curency;
          storedPayment.userID = jwtBody.user.id;
          storedPayment.date = payment.date;
          // storedPayment.time = payment.time;
          const charge = await stripe.charges.create({
              amount: Math.trunc((payment.amount * 100)),
              currency: payment.curency,
              source: token,
              description: "Charge for user " + storedPayment.userID
          });
          console.log(charge);

          return charge;

          //return await this.paymentRepo.create(storedPayment);
        //   const token = stripeToken.id; // Using Express
        //   console.log(token);
        //   try {
        //   const charge = stripe.charges.create({
        //     amount: stripeToken.amount,
        //     currency: 'usd',
        //     description: 'Example charge',
        //     source: token,
        //     metadata: {order_id: 6735},
        //   }, );
        //   return charge;
        // } catch(err) {
        //   console.log(err);
        //   return err;
      }

      catch (err) {
        console.log(err);
          throw new HttpErrors.BadRequest('User invalid');
      }
  }

  @get('/payment-methods')
  async getAllPaymentMethods(): Promise<Array<PaymentMethod>> {
      return await this.paymentRepo.find();
  }

  @get('/payment-methods/{id}')
  async getPaymentMethodsByID(@param.path.number('id') id: number): Promise<PaymentMethod> {

      let paymentMethodExists: boolean = !!(await this.paymentRepo.count({ id }));

      if (!paymentMethodExists) {
          throw new HttpErrors.BadRequest(`Payment method does not exist`);
      }

      return await this.paymentRepo.findById(id);
  }
}