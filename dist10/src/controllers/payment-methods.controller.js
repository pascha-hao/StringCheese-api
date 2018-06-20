"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Uncomment these imports to begin using these cool features!
// import {inject} from @loopback/context;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const payment_methods_1 = require("../models/payment-methods");
const payment_methods_repository_1 = require("../repositories/payment-methods.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
let PaymentMethodsController = class PaymentMethodsController {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async getPaymentMethod() {
        return await this.paymentRepo.find();
    }
    async createPayment(payment, jwt) {
        // if (!payment.cardholder) {
        //     throw new HttpErrors.BadRequest('Missing required data');
        // }
        var stripe = require("stripe")("pk_test_Wr8cGPVS6aiNLEsuYVi0G1wm");
        // Token is created using Checkout or Elements!
        // Get the payment token ID submitted by the form:
        const token = payment.paymenttoken; // Using Express
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            var storedPayment = new payment_methods_1.PaymentMethod;
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
            throw new rest_1.HttpErrors.BadRequest('User invalid');
        }
    }
    async getAllPaymentMethods() {
        return await this.paymentRepo.find();
    }
    async getPaymentMethodsByID(id) {
        let paymentMethodExists = !!(await this.paymentRepo.count({ id }));
        if (!paymentMethodExists) {
            throw new rest_1.HttpErrors.BadRequest(`Payment method does not exist`);
        }
        return await this.paymentRepo.findById(id);
    }
};
__decorate([
    rest_1.get('/payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getPaymentMethod", null);
__decorate([
    rest_1.post('/payment'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_1.PaymentMethod, String]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "createPayment", null);
__decorate([
    rest_1.get('/payment-methods'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getAllPaymentMethods", null);
__decorate([
    rest_1.get('/payment-methods/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentMethodsController.prototype, "getPaymentMethodsByID", null);
PaymentMethodsController = __decorate([
    __param(0, repository_1.repository(payment_methods_repository_1.PaymentMethodsRepository.name)),
    __metadata("design:paramtypes", [payment_methods_repository_1.PaymentMethodsRepository])
], PaymentMethodsController);
exports.PaymentMethodsController = PaymentMethodsController;
//# sourceMappingURL=payment-methods.controller.js.map