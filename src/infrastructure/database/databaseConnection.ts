import { DataSource } from "typeorm";
import { User } from "../../domain/model/User.js";
import { Product } from "../../domain/model/Product.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Order } from "../../domain/model/Order.js";
import { OrderItem } from "../../domain/model/OrderItem.js";

const Database: DataSource = new DataSource({
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

export { Database };
