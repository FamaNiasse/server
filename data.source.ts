import { DataSource } from "typeorm";
import dotenv from "dotenv";

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
  synchronize: false,
  
});

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);


export default AppDataSource;