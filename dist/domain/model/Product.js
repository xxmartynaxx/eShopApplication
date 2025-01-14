var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem.js";
import { OrderItem } from "./OrderItem.js";
let Product = class Product {
};
__decorate([
    ObjectIdColumn(),
    __metadata("design:type", ObjectId)
], Product.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column(type => String),
    __metadata("design:type", Array)
], Product.prototype, "sizesAvailable", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    OneToMany(() => CartItem, (cartItem) => cartItem.product),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
__decorate([
    OneToMany(() => OrderItem, (orderItem) => orderItem.product),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
Product = __decorate([
    Entity()
], Product);
export { Product };
