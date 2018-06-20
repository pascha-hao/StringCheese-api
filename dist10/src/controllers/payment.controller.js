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
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const payment_1 = require("../models/payment");
const payment_repository_1 = require("../repositories/payment.repository");
const stripetoken_1 = require("../models/stripetoken");
const jsonwebtoken_1 = require("jsonwebtoken");
let PaymentController = class PaymentController {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async findPayment() {
        return await this.paymentRepo.find();
    }
    async createPayment(payment) {
        return await this.paymentRepo.create(payment);
    }
    async createStripePayment(stripeToken) {
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
    async getUserInformation(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            return jwtBody.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
};
__decorate([
    rest_1.get('/payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findPayment", null);
__decorate([
    rest_1.post('/payment'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_1.Payment]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    rest_1.post('/stripepayment'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [stripetoken_1.StripeToken]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createStripePayment", null);
__decorate([
    rest_1.get('/me'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getUserInformation", null);
PaymentController = __decorate([
    __param(0, repository_1.repository(payment_repository_1.PaymentRepository.name)),
    __metadata("design:paramtypes", [payment_repository_1.PaymentRepository])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map