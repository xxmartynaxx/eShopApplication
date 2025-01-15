import { insertData } from "./infrastructure/database/insertData.js";
import { Database } from "./infrastructure/database/databaseConnection.js";
import { AdminService } from "./application/adminService.js";
(async function main() {
    const adminRepository = new AdminService();
    await insertData();
    console.log("\nHERE\n");
    await Database.initialize();
    const users = await adminRepository.getAllUsers();
    console.log(users);
    await Database.destroy();
    return;
})();
