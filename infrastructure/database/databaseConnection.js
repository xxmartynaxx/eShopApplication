import { DataSource } from "typeorm";
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: "mongodb", 
  host: "localhost", 
  port: 27017, 
  database: "eShop",
  synchronize: true, 
  logging: true, 
  entities: [User], // Wskazujemy encje, które będą używane
  useUnifiedTopology: true, 
});

export default { AppDataSource };
