import { Router } from "express";
import ProductController from "../controller/ProductController";


const productRouter = Router();
const productController = new ProductController();

// on crée notre requête avec le path, et ce qu'on reçoit(req) et renvoie(res)
// GetAll
productRouter.get("/", (req, res) => {
    console.log("ProductRouter get all");
    productController.getAll(req, res);
});

// GetById
productRouter.get("/:id", (req, res) => {
    console.log("ProductRouter get by id");
    productController.getById(req, res);
});

// Create
productRouter.post("/", (req, res) => {
    console.log("ProductRouter create");
    productController.create(req, res);
});

// Put
productRouter.put("/:id", (req, res) => {
    console.log("ProductRouter update");
    productController.update(req, res);
});

// Delete
productRouter.delete("/:id", (req, res) => {
    console.log("ProductRouter delete");
    productController.delete(req, res);
});

// on exporte pour qu'il puisse être appelé par index.ts
export default productRouter;
