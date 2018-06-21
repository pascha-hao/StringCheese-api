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
const charity_repository_1 = require("../repositories/charity.repository");
const project_repository_1 = require("../repositories/project.repository");
const rest_1 = require("@loopback/rest");
const charity_1 = require("../models/charity");
let CharityController = class CharityController {
    constructor(charityRepo, projectRepo) {
        this.charityRepo = charityRepo;
        this.projectRepo = projectRepo;
    }
    async register(charity) {
        if (!charity.name) {
            throw new rest_1.HttpErrors.BadRequest('missing data');
        }
        let charityExists = !!(await this.charityRepo.count({ name: charity.name }));
        if (charityExists) {
            throw new rest_1.HttpErrors.BadRequest('charity already exists');
        }
        return await this.charityRepo.create(charity);
    }
    async getAllCharities() {
        return await this.charityRepo.find();
    }
    async findCharitiesById(id) {
        // Check for valid ID
        let charityExists = !!(await this.charityRepo.count({ id }));
        if (!charityExists) {
            throw new rest_1.HttpErrors.BadRequest(`charity ID ${id} does not exist`);
        }
        return await this.charityRepo.findById(id);
    }
    async getAllProjects() {
        return await this.projectRepo.find();
    }
};
__decorate([
    rest_1.post('/charities'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [charity_1.Charity]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "register", null);
__decorate([
    rest_1.get('/charities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getAllCharities", null);
__decorate([
    rest_1.get('/charity/{id}'),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "findCharitiesById", null);
__decorate([
    rest_1.get('/projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharityController.prototype, "getAllProjects", null);
CharityController = __decorate([
    __param(0, repository_1.repository(charity_repository_1.CharityRepository.name)),
    __param(1, repository_1.repository(project_repository_1.ProjectRepository.name)),
    __metadata("design:paramtypes", [charity_repository_1.CharityRepository,
        project_repository_1.ProjectRepository])
], CharityController);
exports.CharityController = CharityController;
//# sourceMappingURL=charity.controller.js.map