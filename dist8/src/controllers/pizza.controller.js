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
const rest_1 = require("@loopback/rest");
class PizzaController {
    constructor() { }
    getPizzas() {
        return [
            {
                name: "Hawai",
                topping: "pineapple"
            }
        ];
    }
    requestPizza(pizza) {
        pizza.requested = "yes";
        return pizza;
    }
}
__decorate([
    rest_1.get('/pizzas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PizzaController.prototype, "getPizzas", null);
__decorate([
    rest_1.post('/pizzas'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], PizzaController.prototype, "requestPizza", null);
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map