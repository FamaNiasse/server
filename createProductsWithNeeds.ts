import AppDataSource from "./data.source";
import { Needs } from "./entities/NeedsEntity";
import { Product } from "./entities/ProductEntity";

async function createProductsWithNeeds() {
  await AppDataSource.initialize();

  const productRepository = AppDataSource.getRepository(Product);
  const needRepository = AppDataSource.getRepository(Needs);

  // Créer les besoins
  const needsData = [
    { nom_besoin: "addiction", pictogramme: "/assets/images/pictogrammes/addiction.png" },
    { nom_besoin: "allergies", pictogramme: "/assets/images/pictogrammes/allergies.png" },
    { nom_besoin: "alternatives_saines", pictogramme: "/assets/images/pictogrammes/alternatives_saines.png" },
    { nom_besoin: "beaute_cheveux", pictogramme: "/assets/images/pictogrammes/beaute_cheveux.png" },
    { nom_besoin: "beaute_de_la_peau", pictogramme: "/assets/images/pictogrammes/beaute_de_la_peau.png" },
    { nom_besoin: "beaute_des_ongles", pictogramme: "/assets/images/pictogrammes/beaute_des_ongles.png" },
    { nom_besoin: "beaute_minceur", pictogramme: "/assets/images/pictogrammes/beaute_minceur.png" },
    { nom_besoin: "beaute_purifiant", pictogramme: "/assets/images/pictogrammes/beaute_purifiant.png" },
    { nom_besoin: "bien_etre_feminin", pictogramme: "/assets/images/pictogrammes/bien_etre_feminin.png" },
    { nom_besoin: "bien_etre_masculin", pictogramme: "/assets/images/pictogrammes/bien_etre_masculin.png" },
    { nom_besoin: "bien_etre_urinaire", pictogramme: "/assets/images/pictogrammes/bien_etre_urinaire.png" },
    { nom_besoin: "bronzage", pictogramme: "/assets/images/pictogrammes/bronzage.png" },
    { nom_besoin: "carences", pictogramme: "/assets/images/pictogrammes/carences.png" },
    { nom_besoin: "cerveau", pictogramme: "/assets/images/pictogrammes/cerveau.png" },
    { nom_besoin: "cholesterol", pictogramme: "/assets/images/pictogrammes/cholesterol.png" },
    { nom_besoin: "circulation", pictogramme: "/assets/images/pictogrammes/circulation.png" },
    { nom_besoin: "coeur", pictogramme: "/assets/images/pictogrammes/coeur.png" },
    { nom_besoin: "concentration", pictogramme: "/assets/images/pictogrammes/concentration.png" },
    { nom_besoin: "confort_urinaire", pictogramme: "/assets/images/pictogrammes/confort_urinaire.png" },
    { nom_besoin: "corps", pictogramme: "/assets/images/pictogrammes/corps.png" },
    { nom_besoin: "defenses_musculaire", pictogramme: "/assets/images/pictogrammes/defenses_musculaire.png" },
    { nom_besoin: "defenses_naturelles", pictogramme: "/assets/images/pictogrammes/defenses_naturelles.jpg" },
    { nom_besoin: "detox", pictogramme: "/assets/images/pictogrammes/detox.png" },
    { nom_besoin: "digestion", pictogramme: "/assets/images/pictogrammes/digestion.jpg" },
    { nom_besoin: "diy", pictogramme: "/assets/images/pictogrammes/diy.jpg" },
    { nom_besoin: "immunite", pictogramme: "/assets/images/pictogrammes/immunite.png" },
    { nom_besoin: "infections", pictogramme: "/assets/images/pictogrammes/infections.png" },
    { nom_besoin: "info_sante", pictogramme: "/assets/images/pictogrammes/info_sante.png" },
    { nom_besoin: "ingredients", pictogramme: "/assets/images/pictogrammes/ingredients.png" },
    { nom_besoin: "insectes", pictogramme: "/assets/images/pictogrammes/insectes.png" },
    { nom_besoin: "main", pictogramme: "/assets/images/pictogrammes/main.jpg" },
    { nom_besoin: "maux de tête", pictogramme: "/assets/images/pictogrammes/maux_de_tete.jpg" },
    { nom_besoin: "memoire", pictogramme: "/assets/images/pictogrammes/memoire.png" },
    { nom_besoin: "metabolisme", pictogramme: "/assets/images/pictogrammes/metabolisme.png" },
    { nom_besoin: "moral", pictogramme: "/assets/images/pictogrammes/moral.png" },
    { nom_besoin: "nutrition_pratique", pictogramme: "/assets/images/pictogrammes/nutrition_pratique.png" },
    { nom_besoin: "ongles_et_cheveux", pictogramme: "/assets/images/pictogrammes/ongles_et_cheveux.jpg" },
    { nom_besoin: "os", pictogramme: "/assets/images/pictogrammes/os.png" },
    { nom_besoin: "parasites", pictogramme: "/assets/images/pictogrammes/parasites.png" },
    { nom_besoin: "parfum", pictogramme: "/assets/images/pictogrammes/parfum.png" },
    { nom_besoin: "parfum_ambiance", pictogramme: "/assets/images/pictogrammes/parfum_ambiance.png" },
    { nom_besoin: "peau_cheveux", pictogramme: "/assets/images/pictogrammes/peau_cheveux.jpg" },
    { nom_besoin: "regimes_speciaux", pictogramme: "/assets/images/pictogrammes/regimes_speciaux.png" },
    { nom_besoin: "sante_minceur", pictogramme: "/assets/images/pictogrammes/sante_minceur.png" },
    { nom_besoin: "sexualite", pictogramme: "/assets/images/pictogrammes/sexualite.png" },
    { nom_besoin: "sommeil", pictogramme: "/assets/images/pictogrammes/sommeil.png" },
    { nom_besoin: "sport", pictogramme: "/assets/images/pictogrammes/sport.png" },
    { nom_besoin: "sport_nutrition", pictogramme: "/assets/images/pictogrammes/sport_nutrition.png" },
    { nom_besoin: "stress", pictogramme: "/assets/images/pictogrammes/stress.png" },
    { nom_besoin: "superfood", pictogramme: "/assets/images/pictogrammes/superfood.png" },
    { nom_besoin: "visage", pictogramme: "/assets/images/pictogrammes/visage.png" },
    { nom_besoin: "vision", pictogramme: "/assets/images/pictogrammes/vision.png" },
    { nom_besoin: "vitalite", pictogramme: "/assets/images/pictogrammes/vitalite.jpg" },
    { nom_besoin: "voies_respiratoires", pictogramme: "/assets/images/pictogrammes/voies_respiratoires.jpg" }
  ];

  // Sauvegarder les besoins sans doublons
  for (const needData of needsData) {
    let need = await needRepository.findOneBy({ nom_besoin: needData.nom_besoin });
    if (!need) {
      need = needRepository.create(needData);
      await needRepository.save(need);
    }
  }
  const savedNeeds = await needRepository.find();

  // Créer les produits avec des besoins manuellement attribués
  const productsData = [
    { nom_produit: "Lavande Pure", image: "/assets/images/imgenerate/lavande_pure.jpg", description: "Huile essentielle de lavande 100% pure, idéale pour la relaxation et les soins de la peau.", prix: 15, Promo: false, needs: ["sommeil", "stress", "peau_cheveux", "addiction", "bien_etre_feminin"] },
    { nom_produit: "Eucalyptus Energisant", image: "/assets/images/imgenerate/eucalyptus.jpg", description: "Huile essentielle d'eucalyptus pour une sensation de fraîcheur et de clarté.", prix: 12, Promo: false, needs: ["vitalite", "voies_respiratoires", "concentration", "allergies"] },
    { nom_produit: "Menthe Poivrée", image: "/assets/images/imgenerate/menthe_poivree.jpg", description: "Huile essentielle de menthe poivrée pour un boost de fraîcheur et de concentration.", prix: 14, Promo: false, needs: ["concentration", "maux de tête", "alternatives_saines"] },
    { nom_produit: "Orange Douce", image: "/assets/images/imgenerate/orange_douce.jpg", description: "Huile essentielle d'orange douce pour une atmosphère joyeuse et revitalisante.", prix: 13, Promo: false, needs: ["moral", "stress", "vitalite", "beaute_minceur"] },
    { nom_produit: "Tea Tree Purifiant", image: "/assets/images/imgenerate/tea_tree.jpg", description: "Huile essentielle de tea tree pour un soin purifiant et antibactérien.", prix: 15, Promo: false, needs: ["beaute_purifiant", "infections", "peau_cheveux"] },
    { nom_produit: "Citronnelle Naturelle", image: "/assets/images/imgenerate/citronnelle.jpg", description: "Huile essentielle de citronnelle pour un environnement frais et sans insectes.", prix: 10, Promo: false, needs: ["insectes", "parfum_ambiance", "addiction", "bien_etre_feminin"] },
    { nom_produit: "Jasmin Enchanteur", image: "/assets/images/imgenerate/jasmin.jpg", description: "Huile essentielle de jasmin pour une sensation de bien-être et de bonheur.", prix: 18, Promo: false, needs: ["moral", "parfum", "beaute_purifiant", "bien_etre_masculin"] },
    { nom_produit: "Romarin Tonifiant", image: "/assets/images/imgenerate/romarin.jpg", description: "Huile essentielle de romarin pour une stimulation mentale et physique.", prix: 14, Promo: false, needs: ["circulation", "concentration", "ongles_et_cheveux", "beaute_des_ongles"] },
    { nom_produit: "Bois de Santal", image: "/assets/images/imgenerate/bois_santal.jpg", description: "Huile essentielle de bois de santal pour une méditation profonde et une relaxation.", prix: 20, Promo: false, needs: ["stress", "meditation", "peau_cheveux", "beaute_minceur", "bien_etre_feminin"] },
    { nom_produit: "Immunité Boost", image: "/assets/images/imgenerate/immunite_boost.jpg", description: "Complément alimentaire à base de vitamines C et D, zinc et échinacée.", prix: 25, Promo: false, needs: ["immunite", "infections"] },
    { nom_produit: "Vitalité Quotidienne", image: "/assets/images/imgenerate/vitalite.jpg", description: "Mélange de vitamines B, fer et ginseng pour une énergie quotidienne durable.", prix: 30, Promo: false, needs: ["vitalite", "concentration", "bien_etre_masculin"] },
    { nom_produit: "Sérénité", image: "/assets/images/imgenerate/serenite.jpg", description: "Mélange de magnésium et de plantes pour réduire le stress et favoriser le calme.", prix: 28, Promo: false, needs: ["stress", "sommeil", "beaute_minceur"] },
    { nom_produit: "Détox", image: "/assets/images/imgenerate/detox.jpg", description: "Complément détoxifiant à base de charbon actif et de spiruline.", prix: 32, Promo: false, needs: ["detox", "digestion", "addiction", "beaute_purifiant"] },
    { nom_produit: "Digestion Facile", image: "/assets/images/imgenerate/digestion_facile.jpg", description: "Complément pour améliorer la digestion à base de fenouil et de menthe poivrée.", prix: 20, Promo: false, needs: ["digestion", "beaute_minceur"] },
    { nom_produit: "Articulations Flexibles", image: "/assets/images/imgenerate/articulations.jpg", description: "Complément pour la santé des articulations à base de curcuma et de collagène.", prix: 35, Promo: false, needs: ["os", "circulation", "bien_etre_masculin"] },
    { nom_produit: "Beauté Peau", image: "/assets/images/imgenerate/beaute_peau.jpg", description: "Mélange de biotine, collagène et vitamines pour une peau éclatante.", prix: 29, Promo: false, needs: ["beaute_de_la_peau"] },
    { nom_produit: "Sommeil Paisible", image: "/assets/images/imgenerate/sommeil_paisible.jpg", description: "Complément pour favoriser un sommeil réparateur à base de mélatonine et de camomille.", prix: 22, Promo: false, needs: ["sommeil", "stress", "beaute_purifiant"] },
    { nom_produit: "Mémoire Vive", image: "/assets/images/imgenerate/memoire_vive.jpg", description: "Complément pour améliorer la mémoire et la concentration à base de ginkgo biloba.", prix: 27, Promo: false, needs: ["memoire", "concentration", "bien_etre_feminin"] },
    { nom_produit: "Crème Hydratante Lavande", image: "/assets/images/imgenerate/creme_lavande.jpg", description: "Crème hydratante pour le corps enrichie en huile essentielle de lavande.", prix: 18, Promo: false, needs: ["peau_cheveux", "stress", "beaute_des_ongles"] },
    { nom_produit: "Gommage Sucre & Agrumes", image: "/assets/images/imgenerate/gommage_sucre.jpg", description: "Gommage corporel au sucre et huiles essentielles d'agrumes.", prix: 20, Promo: false, needs: ["beaute_de_la_peau", "circulation", "bien_etre_masculin"] },
    { nom_produit: "Baume à Lèvres Miel", image: "/assets/images/imgenerate/baume_levres.jpg", description: "Baume à lèvres hydratant au miel et à la cire d'abeille.", prix: 8, Promo: false, needs: ["peau_cheveux"] },
    { nom_produit: "Huile de Massage Relaxante", image: "/assets/images/imgenerate/huile_massage.jpg", description: "Huile de massage aux huiles essentielles de lavande et de camomille.", prix: 22, Promo: false, needs: ["stress", "corps", "allergies"] },
    { nom_produit: "Gel Douche Revitalisant", image: "/assets/images/imgenerate/gel_douche.jpg", description: "Gel douche aux huiles essentielles de menthe et d'eucalyptus.", prix: 15, Promo: false, needs: ["peau_cheveux", "vitalite"] },
    { nom_produit: "Lait Corporel Nourrissant", image: "/assets/images/imgenerate/lait_corporel.jpg", description: "Lait corporel hydratant à l'huile de coco et de vanille.", prix: 18, Promo: false, needs: ["peau_cheveux", "beaute_des_ongles"] },
    { nom_produit: "Shampooing Fortifiant Romarin", image: "/assets/images/imgenerate/shampooing_romarin.jpg", description: "Shampooing fortifiant à l'huile essentielle de romarin.", prix: 14, Promo: false, needs: ["beaute_cheveux", "ongles_et_cheveux", "allergies"] },
    { nom_produit: "Masque Capillaire Réparateur Karité", image: "/assets/images/imgenerate/masque_capillaire.jpg", description: "Masque capillaire réparateur au beurre de karité.", prix: 20, Promo: false, needs: ["beaute_cheveux", "ongles_et_cheveux"] },
    { nom_produit: "Sérum Anti-Frisottis Argan", image: "/assets/images/imgenerate/serum_argan.jpg", description: "Sérum capillaire anti-frisottis à l'huile d'argan.", prix: 18, Promo: false, needs: ["beaute_cheveux", "ongles_et_cheveux", "beaute_purifiant"] },
    { nom_produit: "Spray Volume Racines", image: "/assets/images/imgenerate/spray_volume.jpg", description: "Spray volumateur pour les racines aux extraits naturels.", prix: 15, Promo: false, needs: ["beaute_cheveux", "addiction"] },
    { nom_produit: "Huile Capillaire Nourrissante Jojoba", image: "/assets/images/imgenerate/huile_jojoba.jpg", description: "Huile capillaire nourrissante à l'huile de jojoba.", prix: 17, Promo: false, needs: ["beaute_cheveux", "ongles_et_cheveux", "bien_etre_feminin"] },
    { nom_produit: "Spray Assainissant Citron", image: "/assets/images/imgenerate/spray_assainissant.jpg", description: "Spray assainissant à l'huile essentielle de citron pour une maison propre et fraîche.", prix: 12, Promo: false, needs: ["parfum_ambiance", "infections", "beaute_des_ongles"] },
    { nom_produit: "Nettoyant Multi-Surfaces Lavande", image: "/assets/images/imgenerate/nettoyant_lavande.jpg", description: "Nettoyant multi-surfaces à l'huile essentielle de lavande.", prix: 10, Promo: false, needs: ["alternatives_saines", "parfum_ambiance", "allergies"] },
    { nom_produit: "Lessive Naturelle Eucalyptus", image: "/assets/images/imgenerate/lessive.jpg", description: "Lessive naturelle à l'huile essentielle d'eucalyptus pour un linge frais.", prix: 15, Promo: false, needs: ["alternatives_saines", "vitalite", "beaute_minceur"] },
    { nom_produit: "Désodorisant Solide Menthe", image: "/assets/images/imgenerate/desodorisant.jpg", description: "Désodorisant solide à l'huile essentielle de menthe pour une fraîcheur durable.", prix: 8, Promo: false, needs: ["parfum_ambiance", "insectes", "beaute_purifiant"] },
    { nom_produit: "Savon Liquide Citronnelle", image: "/assets/images/imgenerate/savon_liquide.jpg", description: "Savon liquide à l'huile essentielle de citronnelle pour un lavage efficace des mains.", prix: 7, Promo: false, needs: ["alternatives_saines", "parfum_ambiance", "bien_etre_feminin"] },
    { nom_produit: "Diffuseur Ultrasonique Bois", image: "/assets/images/imgenerate/diffuseur.jpg", description: "Diffuseur d'huiles essentielles à ultrasons en bois pour une ambiance apaisante.", prix: 40, Promo: false, needs: ["stress", "parfum_ambiance"] },
    { nom_produit: "Bougie Parfumée Lavande", image: "/assets/images/imgenerate/bougie.jpg", description: "Bougie parfumée à l'huile essentielle de lavande pour une relaxation totale.", prix: 18, Promo: false, needs: ["parfum_ambiance", "stress", "addiction"] },
    { nom_produit: "Bain Aromatique Eucalyptus", image: "/assets/images/imgenerate/bain.jpg", description: "Sel de bain aromatique à l'huile essentielle d'eucalyptus pour une détente revitalisante.", prix: 15, Promo: false, needs: ["corps", "vitalite", "beaute_minceur", "bien_etre_feminin"] },
    { nom_produit: "Brume d'Oreiller Camomille", image: "/assets/images/imgenerate/brume.jpg", description: "Brume d'oreiller à l'huile essentielle de camomille pour un sommeil réparateur.", prix: 10, Promo: false, needs: ["sommeil", "stress", "beaute_des_ongles"] },
    { nom_produit: "Inhalateur Respiration Menthe", image: "/assets/images/imgenerate/inhalateur.jpg", description: "Inhalateur aux huiles essentielles de menthe pour une respiration claire.", prix: 8, Promo: false, needs: ["voies_respiratoires", "vitalite"] },
  ]

  // Sauvegarder les produits sans doublons
  for (const productData of productsData) {
    let product = await productRepository.findOneBy({ nom_produit: productData.nom_produit });
    if (!product) {
      const productNeeds = productData.needs.map(needName => savedNeeds.find(n => n.nom_besoin === needName));
      product = productRepository.create({ ...productData, needs: productNeeds });
      await productRepository.save(product);
    }
  }

  console.log("Produits et besoins créés et associés avec succès");
  await AppDataSource.destroy();
}

createProductsWithNeeds().catch(console.error);
