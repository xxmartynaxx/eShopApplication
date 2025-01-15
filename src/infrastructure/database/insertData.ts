import "reflect-metadata";
import { Database } from "./databaseConnection.js";
import { User } from "../../domain/model/User.js";
import { Product } from "../../domain/model/Product.js";
import { Cart } from "../../domain/model/Cart.js";


export async function insertData() {
    
    await Database.initialize(); 
    console.log("Database has been initialized!");

    const userRepository = Database.getMongoRepository(User);
    const productRepository = Database.getMongoRepository(Product);
    const cartRepository = Database.getMongoRepository(Cart);

    const users = [
        { email: "ann.smith12@gmail.com", password: "annsPswrd12", role: "user", cart: null },
        { email: "bob.mcTaylor@onet.pl", password: "makeUSAGreatAgain", role: "user", cart: null },
        { email: "jane.doe@interia.pl", password: "boringPswrd8", role: "admin", cart: null }
    ];

    const insertedUsers = await userRepository.insertMany(users);


    const products = [
        {
            category: "tops",
            name: "H&M summer top",
            description: "some top's description",
            sizesAvailable: ["xs", "l"],
            price: 12.5,
            stock: 5
        },
        {
            category: "outwear",
            name: "Adidas sweatshirt",
            description: "some sweatshirt's description",
            sizesAvailable: ["m", "l"],
            price: 120,
            stock: 8
        }
    ];

    const insertedProducts = await productRepository.insertMany(products);


    const carts = [
        { user: insertedUsers.insertedIds[0] }, // Koszyk dla Ann
        { user: insertedUsers.insertedIds[1] }  // Koszyk dla Boba
    ];

    const insertedCarts = await cartRepository.insertMany(carts);


    await userRepository.updateOne(
        { _id: insertedUsers.insertedIds[0] },
        { $set: { cart: insertedCarts.insertedIds[0] } }
    );
    await userRepository.updateOne(
        { _id: insertedUsers.insertedIds[1] },
        { $set: { cart: insertedCarts.insertedIds[1] } }
    );

    console.log("Data inserted successfully.");
    await Database.destroy();
}
