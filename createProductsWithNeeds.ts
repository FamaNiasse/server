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
    { nom_besoin: "allergies", pictogramme: "/assets/images/pictogrammes/addiction.png" },
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

  const needs = await needRepository.save(needsData.map(needData => needRepository.create(needData)));

  // Créer les produits avec des besoins manuellement attribués
  const productsData = [
    { nom: "Menthe poivrée", image: "image_data", description: "Menthe poivrée", needs: [needs[0], needs[1], needs[2]] },
    { nom: "achille_millefeuille", image: "image_data", description: "achille_millefeuille", needs: [needs[3], needs[4], needs[5]] },
    { nom: "bois_de_ho", image: "image_data", description: "bois_de_ho", needs: [needs[6], needs[7], needs[8]] },
    { nom: "bois_de_rose", image: "image_data", description: "bois_de_rose", needs: [needs[9], needs[10], needs[11]] },
    { nom: "cade", image: "image_data", description: "cade", needs: [needs[12], needs[13], needs[14]] },
    { nom: "camomille_romaine", image: "image_data", description: "camomille_romaine", needs: [needs[15], needs[16], needs[17]] },
    { nom: "camomille_romaine_bio", image: "image_data", description: "camomille_romaine_bio", needs: [needs[18], needs[19], needs[20]] },
    { nom: "capsules_nez_gorges", image: "image_data", description: "capsules_nez_gorges", needs: [needs[21], needs[22], needs[23]] },
    { nom: "capsules_origan_citron", image: "image_data", description: "capsules_origan_citron", needs: [needs[24], needs[25], needs[26]] },
    { nom: "cedre_de_latlas", image: "image_data", description: "cedre_de_latlas", needs: [needs[27], needs[28], needs[29]] },
    { nom: "chanson_douce", image: "image_data", description: "chanson_douce", needs: [needs[30], needs[31], needs[32]] },
    { nom: "citron", image: "image_data", description: "citron", needs: [needs[33], needs[34], needs[35]] },
    { nom: "citronelle", image: "image_data", description: "citronelle", needs: [needs[36], needs[37], needs[38]] },
    { nom: "coffret_bien_etre", image: "image_data", description: "coffret_bien_etre", needs: [needs[39], needs[40], needs[41]] },
    { nom: "coffret-ma-pause-ensoleillee", image: "image_data", description: "coffret-ma-pause-ensoleillee", needs: [needs[42], needs[43], needs[44]] },
    { nom: "coffret-mon-rituel-zen", image: "image_data", description: "coffret-mon-rituel-zen", needs: [needs[45], needs[46], needs[47]] },
    { nom: "esprit-yoga", image: "image_data", description: "esprit-yoga", needs: [needs[48], needs[49], needs[50]] },
    { nom: "ete-citronnelle", image: "image_data", description: "ete-citronnelle", needs: [needs[51], needs[52], needs[53]] },
    { nom: "eucalyptus_citronne", image: "image_data", description: "eucalyptus_citronne", needs: [needs[0], needs[1], needs[2]] },
    { nom: "eucalyptus_radie", image: "image_data", description: "eucalyptus_radie", needs: [needs[3], needs[4], needs[5]] },
    { nom: "eucalyptus-globulus-bio", image: "image_data", description: "eucalyptus-globulus-bio", needs: [needs[6], needs[7], needs[8]] },
    { nom: "flocon-epice", image: "image_data", description: "flocon-epice", needs: [needs[9], needs[10], needs[11]] },
    { nom: "gaultherie", image: "image_data", description: "gaultherie", needs: [needs[12], needs[13], needs[14]] },
    { nom: "gaultherie-bio", image: "image_data", description: "gaultherie-bio", needs: [needs[15], needs[16], needs[17]] },
    { nom: "geranium-rosat-bio", image: "image_data", description: "geranium-rosat-bio", needs: [needs[18], needs[19], needs[20]] },
    { nom: "girofle-clou-bio", image: "image_data", description: "girofle-clou-bio", needs: [needs[21], needs[22], needs[23]] },
    { nom: "gourmandise-estivale", image: "image_data", description: "gourmandise-estivale", needs: [needs[24], needs[25], needs[26]] },
    { nom: "helichryse_italienne", image: "image_data", description: "helichryse_italienne", needs: [needs[27], needs[28], needs[29]] },
    { nom: "inhalateur_hiver", image: "image_data", description: "inhalateur_hiver", needs: [needs[30], needs[31], needs[32]] },
    { nom: "instant-detente", image: "image_data", description: "instant-detente", needs: [needs[33], needs[34], needs[35]] },
    { nom: "lavande_fine", image: "image_data", description: "lavande_fine", needs: [needs[36], needs[37], needs[38]] },
    { nom: "lavande-aspic-bio", image: "image_data", description: "lavande-aspic-bio", needs: [needs[39], needs[40], needs[41]] },
    { nom: "mandarine_verte", image: "image_data", description: "mandarine_verte", needs: [needs[42], needs[43], needs[44]] },
    { nom: "omega3_comprimes", image: "image_data", description: "omega3_comprimes", needs: [needs[45], needs[46], needs[47]] },
    { nom: "orange_douce", image: "image_data", description: "orange_douce", needs: [needs[48], needs[49], needs[50]] },
    { nom: "orange-douce-bio", image: "image_data", description: "orange-douce-bio", needs: [needs[51], needs[52], needs[53]] },
    { nom: "palmarosa-bio", image: "image_data", description: "palmarosa-bio", needs: [needs[0], needs[1], needs[2]] },
    { nom: "pamplemousse", image: "image_data", description: "pamplemousse", needs: [needs[3], needs[4], needs[5]] },
    { nom: "petit_grain_brigaradier", image: "image_data", description: "petit_grain_brigaradier", needs: [needs[6], needs[7], needs[8]] },
    { nom: "promenade-provencale", image: "image_data", description: "promenade-provencale", needs: [needs[9], needs[10], needs[11]] },
    { nom: "ravintsara", image: "image_data", description: "ravintsara", needs: [needs[12], needs[13], needs[14]] },
    { nom: "roll_on_stress", image: "image_data", description: "roll_on_stress", needs: [needs[15], needs[16], needs[17]] },
    { nom: "roll-on-menthe-poivree-bio", image: "image_data", description: "roll-on-menthe-poivree-bio", needs: [needs[18], needs[19], needs[20]] },
    { nom: "romarin_a_cineole", image: "image_data", description: "romarin_a_cineole", needs: [needs[21], needs[22], needs[23]] },
    { nom: "romarin-verbenone-bio", image: "image_data", description: "romarin-verbenone-bio", needs: [needs[24], needs[25], needs[26]] },
    { nom: "seve_de_bouleau", image: "image_data", description: "seve_de_bouleau", needs: [needs[27], needs[28], needs[29]] },
    { nom: "souffle-frais", image: "image_data", description: "souffle-frais", needs: [needs[30], needs[31], needs[32]] },
    { nom: "spiruline_sachet", image: "image_data", description: "spiruline_sachet", needs: [needs[33], needs[34], needs[35]] },
    { nom: "tea_tree", image: "image_data", description: "tea_tree", needs: [needs[36], needs[37], needs[38]] },
    { nom: "vanille-extrait-bio", image: "image_data", description: "vanille-extrait-bio", needs: [needs[39], needs[40], needs[41]] },
    { nom: "voyage-oriental", image: "image_data", description: "voyage-oriental", needs: [needs[42], needs[43], needs[44]] },
    { nom: "zeste-vitalite", image: "image_data", description: "zeste-vitalite", needs: [needs[45], needs[46], needs[47]] },
    { nom: "serum_repulpant_promo", image: "image_data", description: "serum_repulpant_promo", needs: [needs[48], needs[49], needs[50]] },
    { nom: "seve_de_bouleau_bio_promo", image: "image_data", description: "seve_de_bouleau_bio_promo", needs: [needs[51], needs[52], needs[53]] },
    { nom: "acide_hyaluronique_promo", image: "image_data", description: "acide_hyaluronique_promo", needs: [needs[0], needs[1], needs[2]] },
    { nom: "coffret_orange_mandarine_promo", image: "image_data", description: "coffret_orange_mandarine_promo", needs: [needs[3], needs[4], needs[5]] },
    { nom: "coffret_ashwa_curcuma_promo", image: "image_data", description: "coffret_ashwa_curcuma_promo", needs: [needs[6], needs[7], needs[8]] }
  ];

  const products = productsData.map(productData => productRepository.create(productData));
  await productRepository.save(products);

  console.log("Produits et besoins créés et associés avec succès");

  await AppDataSource.destroy();
}

createProductsWithNeeds().catch(console.error);