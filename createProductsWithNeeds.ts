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
    { nom_besoin: "defenses_naturelles", pictogramme: "/assets/images/pictogrammes/defenses_naturelles.png" },
    { nom_besoin: "detox", pictogramme: "/assets/images/pictogrammes/detox.png" },
    { nom_besoin: "digestion", pictogramme: "/assets/images/pictogrammes/digestion.png" },
    { nom_besoin: "diy", pictogramme: "/assets/images/pictogrammes/diy.png" },
    { nom_besoin: "immunite", pictogramme: "/assets/images/pictogrammes/immunite.png" },
    { nom_besoin: "infections", pictogramme: "/assets/images/pictogrammes/infections.png" },
    { nom_besoin: "info_sante", pictogramme: "/assets/images/pictogrammes/info_sante.png" },
    { nom_besoin: "ingredients", pictogramme: "/assets/images/pictogrammes/ingredients.png" },
    { nom_besoin: "insectes", pictogramme: "/assets/images/pictogrammes/insectes.png" },
    { nom_besoin: "main", pictogramme: "/assets/images/pictogrammes/main.png" },
    { nom_besoin: "maux de tête", pictogramme: "/assets/images/pictogrammes/maux_de_tete.png" },
    { nom_besoin: "memoire", pictogramme: "/assets/images/pictogrammes/memoire.png" },
    { nom_besoin: "metabolisme", pictogramme: "/assets/images/pictogrammes/metabolisme.png" },
    { nom_besoin: "moral", pictogramme: "/assets/images/pictogrammes/moral.png" },
    { nom_besoin: "nutrition_pratique", pictogramme: "/assets/images/pictogrammes/nutrition_pratique.png" },
    { nom_besoin: "ongles_et_cheveux", pictogramme: "/assets/images/pictogrammes/ongles_et_cheveux.png" },
    { nom_besoin: "os", pictogramme: "/assets/images/pictogrammes/os.png" },
    { nom_besoin: "parasites", pictogramme: "/assets/images/pictogrammes/parasites.png" },
    { nom_besoin: "parfum", pictogramme: "/assets/images/pictogrammes/parfum.png" },
    { nom_besoin: "parfum_ambiance", pictogramme: "/assets/images/pictogrammes/parfum_ambiance.png" },
    { nom_besoin: "peau_cheveux", pictogramme: "/assets/images/pictogrammes/peau_cheveux.png" },
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
    { nom_besoin: "vitalite", pictogramme: "/assets/images/pictogrammes/vitalite.png" },
    { nom_besoin: "voies_respiratoires", pictogramme: "/assets/images/pictogrammes/voies_respiratoires.png" }
  ];

    // Sauvegarder les besoins sans doublons
    for (const needData of needsData) {
      let need = await needRepository.findOneBy({ nom_besoin: needData.nom_besoin });
      if (!need) {
        await needRepository.save(need);
      }
    }
    const savedNeeds = await needRepository.find();
 
  // Créer les produits avec des besoins manuellement attribués
  const productsData = [
    { nom_produit: "Menthe poivrée", image: "image_data", description: "Menthe poivrée", needs: [savedNeeds[0], savedNeeds[1], savedNeeds[2]] },
    { nom_produit: "achille_millefeuille", image: "image_data", description: "achille_millefeuille", needs: [savedNeeds[3], savedNeeds[4], savedNeeds[5]] },
    { nom_produit: "bois_de_ho", image: "image_data", description: "bois_de_ho", needs: [savedNeeds[6], savedNeeds[7], savedNeeds[8]] },
    { nom_produit: "bois_de_rose", image: "image_data", description: "bois_de_rose", needs: [savedNeeds[9], savedNeeds[10], savedNeeds[11]] },
    { nom_produit: "cade", image: "image_data", description: "cade", needs: [savedNeeds[12], savedNeeds[13], savedNeeds[14]] },
    { nom_produit: "camomille_romaine", image: "image_data", description: "camomille_romaine", needs: [savedNeeds[15], savedNeeds[16], savedNeeds[17]] },
    { nom_produit: "camomille_romaine_bio", image: "image_data", description: "camomille_romaine_bio", needs: [savedNeeds[18], savedNeeds[19], savedNeeds[20]] },
    { nom_produit: "capsules_nez_gorges", image: "image_data", description: "capsules_nez_gorges", needs: [savedNeeds[21], savedNeeds[22], savedNeeds[23]] },
    { nom_produit: "capsules_origan_citron", image: "image_data", description: "capsules_origan_citron", needs: [savedNeeds[24], savedNeeds[25], savedNeeds[26]] },
    { nom_produit: "cedre_de_latlas", image: "image_data", description: "cedre_de_latlas", needs: [savedNeeds[27], savedNeeds[28], savedNeeds[29]] },
    { nom_produit: "chanson_douce", image: "image_data", description: "chanson_douce", needs: [savedNeeds[30], savedNeeds[31], savedNeeds[32]] },
    { nom_produit: "citron", image: "image_data", description: "citron", needs: [savedNeeds[33], savedNeeds[34], savedNeeds[35]] },
    { nom_produit: "citronelle", image: "image_data", description: "citronelle", needs: [savedNeeds[36], savedNeeds[37], savedNeeds[38]] },
    { nom_produit: "coffret_bien_etre", image: "image_data", description: "coffret_bien_etre", needs: [savedNeeds[39], savedNeeds[40], savedNeeds[41]] },
    { nom_produit: "coffret-ma-pause-ensoleillee", image: "image_data", description: "coffret-ma-pause-ensoleillee", needs: [savedNeeds[42], savedNeeds[43], savedNeeds[44]] },
    { nom_produit: "coffret-mon-rituel-zen", image: "image_data", description: "coffret-mon-rituel-zen", needs: [savedNeeds[45], savedNeeds[46], savedNeeds[47]] },
    { nom_produit: "esprit-yoga", image: "image_data", description: "esprit-yoga", needs: [savedNeeds[48], savedNeeds[49], savedNeeds[50]] },
    { nom_produit: "ete-citronnelle", image: "image_data", description: "ete-citronnelle", needs: [savedNeeds[51], savedNeeds[52], savedNeeds[53]] },
    { nom_produit: "eucalyptus_citronne", image: "image_data", description: "eucalyptus_citronne", needs: [savedNeeds[0], savedNeeds[1], savedNeeds[2]] },
    { nom_produit: "eucalyptus_radie", image: "image_data", description: "eucalyptus_radie", needs: [savedNeeds[3], savedNeeds[4], savedNeeds[5]] },
    { nom_produit: "eucalyptus-globulus-bio", image: "image_data", description: "eucalyptus-globulus-bio", needs: [savedNeeds[6], savedNeeds[7], savedNeeds[8]] },
    { nom_produit: "flocon-epice", image: "image_data", description: "flocon-epice", needs: [savedNeeds[9], savedNeeds[10], savedNeeds[11]] },
    { nom_produit: "gaultherie", image: "image_data", description: "gaultherie", needs: [savedNeeds[12], savedNeeds[13], savedNeeds[14]] },
    { nom_produit: "gaultherie-bio", image: "image_data", description: "gaultherie-bio", needs: [savedNeeds[15], savedNeeds[16], savedNeeds[17]] },
    { nom_produit: "geranium-rosat-bio", image: "image_data", description: "geranium-rosat-bio", needs: [savedNeeds[18], savedNeeds[19], savedNeeds[20]] },
    { nom_produit: "girofle-clou-bio", image: "image_data", description: "girofle-clou-bio", needs: [savedNeeds[21], savedNeeds[22], savedNeeds[23]] },
    { nom_produit: "gourmandise-estivale", image: "image_data", description: "gourmandise-estivale", needs: [savedNeeds[24], savedNeeds[25], savedNeeds[26]] },
    { nom_produit: "helichryse_italienne", image: "image_data", description: "helichryse_italienne", needs: [savedNeeds[27], savedNeeds[28], savedNeeds[29]] },
    { nom_produit: "inhalateur_hiver", image: "image_data", description: "inhalateur_hiver", needs: [savedNeeds[30], savedNeeds[31], savedNeeds[32]] },
    { nom_produit: "instant-detente", image: "image_data", description: "instant-detente", needs: [savedNeeds[33], savedNeeds[34], savedNeeds[35]] },
    { nom_produit: "lavande_fine", image: "image_data", description: "lavande_fine", needs: [savedNeeds[36], savedNeeds[37], savedNeeds[38]] },
    { nom_produit: "lavande-aspic-bio", image: "image_data", description: "lavande-aspic-bio", needs: [savedNeeds[39], savedNeeds[40], savedNeeds[41]] },
    { nom_produit: "mandarine_verte", image: "image_data", description: "mandarine_verte", needs: [savedNeeds[42], savedNeeds[43], savedNeeds[44]] },
    { nom_produit: "omega3_comprimes", image: "image_data", description: "omega3_comprimes", needs: [savedNeeds[45], savedNeeds[46], savedNeeds[47]] },
    { nom_produit: "orange_douce", image: "image_data", description: "orange_douce", needs: [savedNeeds[48], savedNeeds[49], savedNeeds[50]] },
    { nom_produit: "orange-douce-bio", image: "image_data", description: "orange-douce-bio", needs: [savedNeeds[51], savedNeeds[52], savedNeeds[53]] },
    { nom_produit: "palmarosa-bio", image: "image_data", description: "palmarosa-bio", needs: [savedNeeds[0], savedNeeds[1], savedNeeds[2]] },
    { nom_produit: "pamplemousse", image: "image_data", description: "pamplemousse", needs: [savedNeeds[3], savedNeeds[4], savedNeeds[5]] },
    { nom_produit: "petit_grain_brigaradier", image: "image_data", description: "petit_grain_brigaradier", needs: [savedNeeds[6], savedNeeds[7], savedNeeds[8]] },
    { nom_produit: "promenade-provencale", image: "image_data", description: "promenade-provencale", needs: [savedNeeds[9], savedNeeds[10], savedNeeds[11]] },
    { nom_produit: "ravintsara", image: "image_data", description: "ravintsara", needs: [savedNeeds[12], savedNeeds[13], savedNeeds[14]] },
    { nom_produit: "roll_on_stress", image: "image_data", description: "roll_on_stress", needs: [savedNeeds[15], savedNeeds[16], savedNeeds[17]] },
    { nom_produit: "roll-on-menthe-poivree-bio", image: "image_data", description: "roll-on-menthe-poivree-bio", needs: [savedNeeds[18], savedNeeds[19], savedNeeds[20]] },
    { nom_produit: "romarin_a_cineole", image: "image_data", description: "romarin_a_cineole", needs: [savedNeeds[21], savedNeeds[22], savedNeeds[23]] },
    { nom_produit: "romarin-verbenone-bio", image: "image_data", description: "romarin-verbenone-bio", needs: [savedNeeds[24], savedNeeds[25], savedNeeds[26]] },
    { nom_produit: "seve_de_bouleau", image: "image_data", description: "seve_de_bouleau", needs: [savedNeeds[27], savedNeeds[28], savedNeeds[29]] },
    { nom_produit: "souffle-frais", image: "image_data", description: "souffle-frais", needs: [savedNeeds[30], savedNeeds[31], savedNeeds[32]] },
    { nom_produit: "spiruline_sachet", image: "image_data", description: "spiruline_sachet", needs: [savedNeeds[33], savedNeeds[34], savedNeeds[35]] },
    { nom_produit: "tea_tree", image: "image_data", description: "tea_tree", needs: [savedNeeds[36], savedNeeds[37], savedNeeds[38]] },
    { nom_produit: "vanille-extrait-bio", image: "image_data", description: "vanille-extrait-bio", needs: [savedNeeds[39], savedNeeds[40], savedNeeds[41]] },
    { nom_produit: "voyage-oriental", image: "image_data", description: "voyage-oriental", needs: [savedNeeds[42], savedNeeds[43], savedNeeds[44]] },
    { nom_produit: "zeste-vitalite", image: "image_data", description: "zeste-vitalite", needs: [savedNeeds[45], savedNeeds[46], savedNeeds[47]] },
    { nom_produit: "serum_repulpant_promo", image: "image_data", description: "serum_repulpant_promo", needs: [savedNeeds[48], savedNeeds[49], savedNeeds[50]] },
    { nom_produit: "seve_de_bouleau_bio_promo", image: "image_data", description: "seve_de_bouleau_bio_promo", needs: [savedNeeds[51], savedNeeds[52], savedNeeds[53]] },
    { nom_produit: "acide_hyaluronique_promo", image: "image_data", description: "acide_hyaluronique_promo", needs: [savedNeeds[0], savedNeeds[1], savedNeeds[2]] },
    { nom_produit: "coffret_orange_mandarine_promo", image: "image_data", description: "coffret_orange_mandarine_promo", needs: [savedNeeds[3], savedNeeds[4], savedNeeds[5]] },
    { nom_produit: "coffret_ashwa_curcuma_promo", image: "image_data", description: "coffret_ashwa_curcuma_promo", needs: [savedNeeds[6], savedNeeds[7], savedNeeds[8]] }
  ];

  // Sauvegarder les produits sans doublons
  for (const productData of productsData) {
    let product = await productRepository.findOneBy({ nom_produit: productData.nom_produit });
    if (!product) {
      product = productRepository.create(productData);
      await productRepository.save(product);
    }
  }

  console.log("Produits et besoins créés et associés avec succès");
  await AppDataSource.destroy();
}

createProductsWithNeeds().catch(console.error);
