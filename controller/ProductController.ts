import { Request, Response } from "express";
import ProductService from "../services/ProductService";

class ProductController {
    // instance de ProductService
    private productService = new ProductService();

    async getAll(req: Request, res: Response) {
        console.log("ProductController get all");

        try {
            const products = await this.productService.getAll();
            res.send({ status: "OK", data: products });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }

    async getById(req: Request, res: Response) {
        console.log("ProductController get by id");

        try {
            const product = await this.productService.getById(Number(req.params.id));
            res.send({ status: "OK", data: product });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }

    async create(req: Request, res: Response) {
        console.log("ProductController create");

        try {
            const product = await this.productService.create(req.body);
            res.send({ status: "OK", data: product });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }

    async update(req: Request, res: Response) {
        console.log("ProductController update");

        try {
            const product = await this.productService.update(Number(req.params.id), req.body);
            res.send({ status: "OK", data: product });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }

    async delete(req: Request, res: Response) {
        console.log("ProductController delete");

        try {
            const product = await this.productService.delete(Number(req.params.id));
            res.send({ status: "OK", data: product });
        } catch (error) {
            res.status(500).send({ status: "Failed", message: error });
        }
    }
}

export default ProductController;
