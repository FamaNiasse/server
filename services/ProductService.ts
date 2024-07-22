import AppDataSource from "../data.source";
import { Product } from "../entities/ProductEntity";

class ProductService {
    private productRepository = AppDataSource.getRepository(Product);

    async getAll() {
        console.log("ProductServices");
        return this.productRepository.find({ relations: ["category"] });
    }

    async getById(id: number) {
        console.log("ProductService by id");
        return this.productRepository.findOne({ where: { id }, relations: ["category"] });
    }

    async getByIdWithPharmacies(id: number) {
        console.log("ProductService by id with pharmacies");
        return this.productRepository.findOne({ where: { id }, relations: ["category", "pharmacies"] });
    }

    async getByCategory(categoryId: number) {
        console.log("ProductService by category");
        return this.productRepository.find({ where: { category: { id: categoryId } }, relations: ["category"] });
    }

    async create(product: Product) {
        console.log("ProductService create");
        const newProduct = this.productRepository.create(product);
        return this.productRepository.save(newProduct);
    }

    async update(id: number, product: Product) {
        console.log("ProductService update");
        return this.productRepository.update(id, product);
    }

    async delete(id: number) {
        console.log("ProductServicesDelete");
        return this.productRepository.delete(id);
    }
}

export default ProductService;
