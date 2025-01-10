import "reflect-metadata";
import { Database } from "./infrastructure/database/databaseConnection.js";
import { User } from "./domain/model/User.js";
import { Product } from "./domain/model/Product.js";
import { Cart } from "./domain/model/Cart.js";



const userRepository = await Database.getMongoRepository(User);
const productRepository = await Database.getMongoRepository(Product);
const cartRepository = await Database.getMongoRepository(Cart);

async function seedData() {
    // 1. Wstaw użytkowników
    const users = [
        { email: "ann.smith12@gmail.com", password: "annsPswrd12", role: "user", cart: null },
        { email: "bob.mcTaylor@onet.pl", password: "makeUSAGreatAgain", role: "user", cart: null },
        { email: "jane.doe@interia.pl", password: "boringPassw1", role: "admin", cart: null }
    ];

    const insertedUsers = await userRepository.insertMany(users);
    console.log("Inserted Users:", insertedUsers);

    // 2. Wstaw produkty
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
    console.log("Inserted Products:", insertedProducts);

    // 3. Wstaw koszyki
    const carts = [
        { user: insertedUsers.insertedIds[0], items: [] }, // Koszyk dla Ann
        { user: insertedUsers.insertedIds[1], items: [] }  // Koszyk dla Boba
    ];

    const insertedCarts = await cartRepository.insertMany(carts);
    console.log("Inserted Carts:", insertedCarts);

    // Zaktualizuj referencje użytkowników do koszyków
    await userRepository.updateOne(
        { _id: insertedUsers.insertedIds[0] },
        { $set: { cart: insertedCarts.insertedIds[0] } }
    );
    await userRepository.updateOne(
        { _id: insertedUsers.insertedIds[1] },
        { $set: { cart: insertedCarts.insertedIds[1] } }
    );
}

seedData().catch(console.error);
