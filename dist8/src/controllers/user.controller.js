"use strict";
// Uncomment these imports to begin using these cool features!
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
// import {inject} from @loopback/context;
const repository_1 = require("@loopback/repository");
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const user_1 = require("../models/user");
const login_1 = require("../models/login");
const payment_1 = require("../models/payment");
const jsonwebtoken_1 = require("jsonwebtoken");
let UserController = class UserController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async register(user) {
        return await this.userRepo.create(user);
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async login(login) {
        // Check that email and password are both supplied
        if (!login.email || !login.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: login.email },
                { password: login.password },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        jsonwebtoken_1.sign({
            user: user_1.User
        }, 'shh', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za'
        });
        return await this.userRepo.findOne({
            where: {
                and: [
                    { email: login.email },
                    { password: login.password }
                ],
            },
        });
    }
    async findUsersById(id) {
        // Check for valid ID
        let userExists = !!(await this.userRepo.count({ id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
        return await this.userRepo.findById(id);
    }
    async getDonationsByUserId(userId, dateFrom, authorization) {
        console.log(userId);
        console.log(dateFrom);
    }
    async user(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password || !user.firstname || !user.lastname) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
                { password: user.password },
            ],
        }));
        if (userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        return await this.userRepo.create(user);
    }
    async payment(pay) {
        // Check that credit card info is supplied
        if (!pay.ccnum || !pay.exp || !pay.cvc || !pay.userID) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        else {
            var user = new user_1.User();
            //user = this.userRepo.findById(pay.userID);
            user.ccnum = "pay.ccnum";
            user.exp = "pay.exp";
            user.exp = "pay.cvc";
            this.userRepo.update(user);
        }
    }
};
__decorate([
    rest_1.post('/users'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    rest_1.get('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.Login]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    rest_1.get('/users/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findUsersById", null);
__decorate([
    rest_1.get('/users/{user_id}/donations'),
    __param(0, rest_1.param.path.number('user_id')),
    __param(1, rest_1.param.query.date('date_from')),
    __param(2, rest_1.param.header.string('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Date, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDonationsByUserId", null);
__decorate([
    rest_1.post('/register'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "user", null);
__decorate([
    rest_1.post('/payment-methods'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_1.Payment]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "payment", null);
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map