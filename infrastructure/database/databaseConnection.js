import { DataSource } from "typeorm";
import { User } from "../../domain/model/User";
import { Product } from "../../domain/model/Product";
import { Cart } from "../../domain/model/Cart";
import { CartItem } from "../../domain/model/CartItem";
import { Order } from "../../domain/model/Order";
import { OrderItem } from "../../domain/model/OrderItem";

const Database = new DataSource({
  type: "mongodb", 
  host: "localhost",
  port: 27017, 
  database: "eShop", 
  synchronize: true,
  logging: true,
  entities: [
    User,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
  ], 
  useUnifiedTopology: true
});

export default { Database };
