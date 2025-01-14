var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ObjectIdColumn, Column, OneToOne, OneToMany } from "typeorm";
import { ObjectId } from "mongodb";
import { Cart } from "./Cart.js";
import { Order } from "./Order.js";
let User = class User {
};
__decorate([
    ObjectIdColumn(),
    __metadata("design:type", ObjectId)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    OneToOne(() => Cart, (cart) => cart.user),
    __metadata("design:type", Object)
], User.prototype, "cart", void 0);
__decorate([
    OneToMany(() => Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
User = __decorate([
    Entity()
], User);
export { User };
