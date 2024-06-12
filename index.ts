import AppDataSource from './data.source';
import express from 'express';
import cors  from 'cors';
import productRouter from './routes/ProductRoutes';
import userRouter from './routes/UserRoutes';
import dotenv from 'dotenv';
import needRouter from './routes/NeedsRoutes';

dotenv.config(); // Charger les variables d'environnement à partir du fichier .env
AppDataSource.initialize().then(() => {
// Créer une instance d'application Express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/needs", needRouter);

// démarrer le server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
}).catch(error => console.log("Error during Data Source initialization:", error));