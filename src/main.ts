import { insertData } from "./infrastructure/database/insertData.js";
import { Database } from "./infrastructure/database/databaseConnection.js";
import { AdminService } from "./application/adminService.js";
import { CartService } from "./application/cartService.js";
import { OrderService } from "./application/orderService.js";
import { ProductService } from "./application/productService.js";
import { UserService } from "./application/userService.js";

(async function main() {

    const adminRepository = new AdminService();

    //await insertData();

    await Database.initialize();

    const users = await adminRepository.getAllUsers();
    console.log(users);

    await Database.destroy();
    return;

})();