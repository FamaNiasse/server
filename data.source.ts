import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "./entities/ProductEntity";
import { User } from "./entities/UserEntity";
import { Needs } from "./entities/NeedsEntity";

// Charger les variables d'environnement depuis .env.local
dotenv.config({path: ".env.local"});


// Vérifier que les variables essentielles sont définies
if (typeof process.env.DB_PASSWORD !== 'string') {
  throw new Error('DB_PASSWORD undefined');
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === "") {
  throw new Error('JWT_SECRET must have a value');
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
  logging: false,
  entities: [Product, User, Needs],
});

export default AppDataSource;