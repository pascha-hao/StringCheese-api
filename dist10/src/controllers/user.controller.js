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
const user_repository_1 = require("../repositories/user.repository");
const rest_1 = require("@loopback/rest");
const user_1 = require("../models/user");
const login_1 = require("../models/login");
const payment_methods_1 = require("../models/payment-methods");
const donation_1 = require("../models/donation");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const charity_repository_1 = require("../repositories/charity.repository");
const donation_repository_1 = require("../repositories/donation.repository");
let UserController = class UserController {
    constructor(userRepo, charityRepo, donationRepo) {
        this.userRepo = userRepo;
        this.charityRepo = charityRepo;
        this.donationRepo = donationRepo;
    }
    async register(user) {
        return await this.userRepo.create(user);
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async login(login) {
        var users = await this.userRepo.find();
        var username = login.email;
        console.log(login.email);
        console.log(login.password);
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            console.log(user.password);
            if (user.email == username && await bcrypt.compare(login.password, user.password)) {
                console.log("yay");
                var jwt = jsonwebtoken_1.sign({
                    user: {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    },
                    anything: "hello"
                }, 'shh', {
                    issuer: 'auth.ix.co.za',
                    audience: 'ix.co.za',
                });
                return {
                    token: jwt,
                    something: "lol"
                };
            }
        }
        throw new rest_1.HttpErrors.Unauthorized('User not found, sorry!');
        //return "Error";
    }
    async findUsersById(id) {
        // Check for valid ID
        let userExists = !!(await this.userRepo.count({ id }));
        if (!userExists) {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
        return await this.userRepo.findById(id);
    }
    async getUserbyKey(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            console.log(jwtBody);
            return jwtBody;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
    }
    async deleteUserbyID(id) {
        let userExists = !!(await this.userRepo.count({ id }));
        if (userExists) {
            this.userRepo.deleteById(id);
        }
        else {
            throw new rest_1.HttpErrors.BadRequest(`user ID ${id} does not exist`);
        }
    }
    // @get('/users/{user_id}/donations')
    // async getDonationsByUserId(
    //   @param.path.number('user_id') userId: number,
    //   @param.query.date('date_from') dateFrom: Date,
    //   @param.header.string('authorization') authorization: string
    // ) {
    //   console.log(userId);
    //   console.log(dateFrom);
    // }
    async createUser(user) {
        let hashedPassword = await bcrypt.hash(user.password, 10);
        var userToStore = new user_1.User();
        userToStore.firstname = user.firstname;
        userToStore.lastname = user.lastname;
        userToStore.email = user.email;
        userToStore.password = hashedPassword;
        let userExists = !!(await this.userRepo.count({ email: user.email }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest("Email already Exists");
        }
        let storedUser = await this.userRepo.create(userToStore);
        storedUser.password = "";
        var jwt = jsonwebtoken_1.sign({
            user: storedUser,
        }, 'shh', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
        });
        return {
            token: jwt,
        };
    }
    async editUser(edit, jwt) {
        let userId = null;
        try {
            userId = jsonwebtoken_1.verify(jwt, 'shh').user.id;
        }
        catch (_a) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid JWT.");
        }
        await this.userRepo.updateById(userId, edit);
        var jwt = jsonwebtoken_1.sign({
            user: await this.userRepo.findById(userId),
        }, 'shh', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
        });
        return {
            token: jwt,
        };
    }
    async createDonation(donation) {
        console.log(donation.charity_id);
        console.log(donation.user_id);
        console.log(donation.amount);
        console.log(donation.charity_name);
        //console.log(donation.donate_date);
        var donationToStore = new donation_1.Donation();
        donationToStore.charity_id = donation.charity_id;
        donationToStore.user_id = donation.user_id;
        donationToStore.amount = donation.amount;
        donationToStore.charity_name = donation.charity_name;
        donationToStore.is_subscription = false;
        this.donationRepo.create(donationToStore);
    }
    async subscribe(donation) {
        //console.log(donation.is_subscription);
        //console.log(donation.donate_date);
        var donationToStore = new donation_1.Donation();
        donationToStore.charity_id = donation.charity_id;
        donationToStore.user_id = donation.user_id;
        donationToStore.amount = donation.amount;
        donationToStore.charity_name = donation.charity_name;
        donationToStore.is_subscription = true;
        this.donationRepo.create(donationToStore);
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
    async loginWithQuery(login) {
        var users = await this.userRepo.find({
            where: {
                and: [{ email: login.email }, { password: login.password }],
            },
        });
        if (users.length == 0) {
            throw new rest_1.HttpErrors.NotFound('User not found, sorry!');
        }
        return users[0];
    }
    async updateUserById(id, user) {
        id = +id;
        return await this.userRepo.updateById(id, user);
    }
    async getDonationsbyUserId(jwt) {
        try {
            let jwtBody = jsonwebtoken_1.verify(jwt, 'shh');
            return await this.donationRepo.find({ where: { user_id: jwtBody.user.id } });
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized();
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
    rest_1.get('/users'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserbyKey", null);
__decorate([
    rest_1.del('/users'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserbyID", null);
__decorate([
    rest_1.post('/register'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    rest_1.post('/edit'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    rest_1.post('/donation'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_1.Donation]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createDonation", null);
__decorate([
    rest_1.post('/subscribe'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [donation_1.Donation]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subscribe", null);
__decorate([
    rest_1.post('/payment-methods'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_methods_1.PaymentMethod]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "payment", null);
__decorate([
    rest_1.post('/login-with-query'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.Login]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginWithQuery", null);
__decorate([
    rest_1.patch('/user/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserById", null);
__decorate([
    rest_1.get('/donations'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDonationsbyUserId", null);
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __param(1, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __param(2, repository_1.repository(donation_repository_1.DonationRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        charity_repository_1.CharityRepository,
        donation_repository_1.DonationRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map