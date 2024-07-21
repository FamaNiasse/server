import AppDataSource from './data.source';
import { Category } from './entities/CategoryEntity';
import { Product } from './entities/ProductEntity';

const initializeData = async () => {
  await AppDataSource.initialize();

  const categoryRepository = AppDataSource.getRepository(Category);
  const productRepository = AppDataSource.getRepository(Product);

  const categories = [
    { nom_categorie: 'Huiles Essentielles' },
    { nom_categorie: 'Compléments Alimentaires' },
    { nom_categorie: 'Soins pour le Corps' },
    { nom_categorie: 'Soins Capillaires' },
    { nom_categorie: 'Entretien de la Maison' },
    { nom_categorie: 'Aromathérapie et Bien-être' },
  ];

  const savedCategories = await categoryRepository.save(categories);

  const products = await productRepository.find();
  for (const product of products) {
    // Assign a random category to each product for this example
    product.category = savedCategories[Math.floor(Math.random() * savedCategories.length)];
  }

  await productRepository.save(products);

  console.log('Catégories mises à jour');
  await AppDataSource.destroy();
};

initializeData().catch(console.error);
