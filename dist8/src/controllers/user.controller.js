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
const payment_1 = require("../models/payment");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        else {
            var currentUser = await this.userRepo.findOne({
                where: {
                    and: [
                        { email: login.email },
                    ],
                },
            });
            let same = await bcrypt.compare(login.password, currentUser.password);
            if (same) {
                var jwt = jsonwebtoken_1.sign({
                    user: currentUser,
                }, 'shh', {
                    issuer: 'auth.ix.co.za',
                    audience: 'ix.co.za',
                });
                return {
                    token: jwt,
                };
            }
            else {
                throw new rest_1.HttpErrors.Unauthorized('Invalid Login Information');
            }
        }
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
    async getDonationsByUserId(userId, dateFrom, authorization) {
        console.log(userId);
        console.log(dateFrom);
    }
    async createUser(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password || !user.firstname || !user.lastname) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email is valid
        let userExists = !!(await this.userRepo.count({ username: user.username }));
        if (userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        let emailExists = !!(await this.userRepo.count({ email: user.email }));
        if (emailExists) {
            throw new rest_1.HttpErrors.BadRequest('email is already registered');
        }
        let hashedPassword = await bcrypt.hash(user.password, 10);
        var userToStore = new user_1.User();
        userToStore.firstname = user.firstname;
        userToStore.lastname = user.lastname;
        userToStore.username = user.username;
        userToStore.email = user.email;
        userToStore.dob = user.dob;
        userToStore.password = hashedPassword;
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
], UserController.prototype, "createUser", null);
__decorate([
    rest_1.post('/payment-methods'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_1.Payment]),
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
UserController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map