import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "./entities/ProductEntity";
import { User } from "./entities/UserEntity";
import { Needs } from "./entities/NeedsEntity";

dotenv.config({path: ".env.local"});


if (typeof process.env.DB_PASSWORD !== 'string') {
  throw new Error('mdp undefined');
}

const AppDataSource = new DataSource({
  type: "postgres",
  // va chercher la variable dans l'environnement
  // on peut utiliser le process grace a NODEJS qui contient dotenv
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Product, User, Needs],
});

export default AppDataSource;