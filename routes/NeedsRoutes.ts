import { Router } from 'express';
import NeedsController from '../controller/NeedsController';

const needsRouter = Router();
const needsController = new NeedsController();

// Obtenir tous les besoins
needsRouter.get("/", (req, res) => {
    console.log("NeedsRouter get all");
    needsController.getAll(req, res);
});

// Obtenir les produits par besoin
needsRouter.get("/:id", (req, res) => {
    console.log("NeedsRouter get products by need");
    needsController.getProductsByNeed(req, res);
});

export default needsRouter;
