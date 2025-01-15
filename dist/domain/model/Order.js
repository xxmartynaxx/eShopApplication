var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
let Order = class Order {
};
__decorate([
    ObjectIdColumn(),
    __metadata("design:type", ObjectId)
], Order.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column(),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    Column(),
    __metadata("design:type", ObjectId)
], Order.prototype, "user", void 0);
Order = __decorate([
    Entity()
], Order);
export { Order };
