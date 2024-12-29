import { Database } from "../database/databaseConnection";
import { Product } from "../../domain/model/Product";

export async function getAllProducts() {
    const productCollection = Database.getRepository(Product);
    return await productCollection.find();
};

