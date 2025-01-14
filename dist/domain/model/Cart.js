var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ObjectIdColumn, OneToOne, OneToMany } from "typeorm";
import { ObjectId } from "mongodb";
import { CartItem } from "./CartItem.js";
import { User } from "./User.js";
let Cart = class Cart {
};
__decorate([
    ObjectIdColumn(),
    __metadata("design:type", ObjectId)
], Cart.prototype, "id", void 0);
__decorate([
    OneToOne(() => User, (user) => user.cart),
    __metadata("design:type", User)
], Cart.prototype, "user", void 0);
__decorate([
    OneToMany(() => CartItem, (cartItem) => cartItem.cart),
    __metadata("design:type", Array)
], Cart.prototype, "cartItems", void 0);
Cart = __decorate([
    Entity()
], Cart);
export { Cart };
