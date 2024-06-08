import AppDataSource from './data.source';
import express from 'express';
import cors  from 'cors';
import productRouter from './routes/ProductRoutes';
import userRouter from './routes/UserRoutes';


AppDataSource.initialize().then(() => {
// Créer une instance d'application Express
const app = express();
app.use(cors());
//on paramètre la possibilité de récupérer des infos dans un  body au format json
app.use(express.json());

// app.get('/', (req, res) => {
//     res.json({ message: "Hello, world!"});
// });

//je defini l'url pour les routes uniquement
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
})