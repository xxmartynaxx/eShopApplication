var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { ObjectId } from "mongodb";
import { Product } from "./Product.js";
import { Cart } from "./Cart.js";
let CartItem = class CartItem {
};
__decorate([
    ObjectIdColumn(),
    __metadata("design:type", ObjectId)
], CartItem.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.cartItems),
    __metadata("design:type", Product)
], CartItem.prototype, "product", void 0);
__decorate([
    ManyToOne(() => Cart, (cart) => cart.cartItems),
    __metadata("design:type", Cart)
], CartItem.prototype, "cart", void 0);
CartItem = __decorate([
    Entity()
], CartItem);
export { CartItem };
