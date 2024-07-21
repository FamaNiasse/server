import { join } from 'path';
import { readFileSync } from 'fs';
import AppDataSource from './data.source';
import { Pharmacy } from './entities/PharmacyEntity';
import { Product } from './entities/ProductEntity';

const initializePharmacies = async () => {
  try {
    await AppDataSource.initialize();

    const pharmacyRepository = AppDataSource.getRepository(Pharmacy);
    const productRepository = AppDataSource.getRepository(Product);

    // Lire le fichier JSON
    const filePath = join(__dirname, 'pharmacy.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const pharmacies: Pharmacy[] = JSON.parse(fileContent);

    // Sauvegarder les pharmacies
    const savedPharmacies = await pharmacyRepository.save(pharmacies);
    console.log('Pharmacies ajoutées');

    // Charger tous les produits
    const products = await productRepository.find();

    // Associer chaque produit à un nombre aléatoire de pharmacies
    for (const product of products) {
      const randomPharmacies = savedPharmacies.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * savedPharmacies.length) + 1);
      product.pharmacies = randomPharmacies;
      await productRepository.save(product);
    }

    console.log('Produits associés aux pharmacies');

  } catch (error) {
    console.error('Erreur lors de l\'initialisation des pharmacies:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

initializePharmacies().catch(console.error);
