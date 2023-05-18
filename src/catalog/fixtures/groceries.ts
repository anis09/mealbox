import { GrocerySchemaName, GroceryCollection } from '../schemas';
import { StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app.config';
import { S3Storage } from '../../common';
import * as path from 'path';
import * as fs from 'fs';

export default {
  schemaName: GrocerySchemaName,
  class: GroceryCollection,
  items: {
    petit_pain_individuel_supplement: {
      uuid: '308a6e82-f051-5c95-b03d-b26dee069573',
      name: 'Petit pain individuel supplément',
      category: 'A grignoter',
      description:
        "Reste de sauce, petit bout de fromage en trop... Être à un petit pain du bonheur, ça nous est déjà tous arrivé ! \r\nImpossible de se retrouver dans l'embarras avec ce petit pain en plus :-)",
      image: 'medias/groceries/petit_pain_individuel_supplement.jpg',
      price: 300,
    },
    cookies_chocolat_noisettes_28_2_gr: {
      uuid: '27c78305-783f-5064-b715-14ebd081d3d6',
      name: 'Cookies chocolat noisettes 28.2 gr',
      category: 'A grignoter',
      description:
        "Il est aussi bon que beau ce cookie ! Des pépites de chocolat et des éclats de noisettes c'est tout ce qu'on aime pour accompagner le café (ou juste pour grignoter).",
      image: 'medias/groceries/cookies_chocolat_noisettes_28_2_gr.jpg',
      price: 750,
    },
    chips_croustillantes: {
      uuid: '06c4a2c3-4841-58f2-b8bf-28beed0b2dec',
      name: 'Chips croustillantes',
      category: 'A grignoter',
      description:
        "Des chips bien croustillantes, natures : c'est la base ! Ça se mange sans faim et on fait envie à tout le monde.",
      image: 'medias/groceries/chips_croustillantes.jpg',
      price: 750,
    },
    madeleine_pur_beurre_25_g_carton_de_84_madeleines: {
      uuid: '687297d2-8901-5415-9492-740e7c48d8e4',
      name: 'Madeleine pur Beurre 25 g , carton de 84 madeleines',
      category: 'A grignoter',
      description:
        'La madeleine Bonne Maman c’est vraiment la douceur de toute heure… En petit dessert, avec le café, ou juste en cas de coup de mou, elle est sur tous les fronts pour nous réconforter !',
      image:
        'medias/groceries/madeleine_pur_beurre_25_g_carton_de_84_madeleines.jpg',
      price: 750,
    },
    chips_croustillantes_barbecue: {
      uuid: '8ca9c239-78a9-502b-b06b-7034de52b785',
      name: 'Chips croustillantes barbecue',
      category: 'A grignoter',
      description:
        "Des chips au barbecue bien croustillantes, c'est de la bonne gourmandise. Faites attention, c'est très vite addictif.",
      image: 'medias/groceries/chips_croustillantes_barbecue.jpg',
      price: 750,
    },
    mini_stick_nature_en_carton_3sticks: {
      uuid: '2a1962fd-ad8e-5f92-b54e-ce0d550d0554',
      name: 'Mini stick nature en carton (3sticks)',
      category: 'A grignoter',
      description: '1, 2, 3 croquez ! ',
      image: 'medias/groceries/mini_stick_nature_en_carton_3sticks.jpg',
      price: 1000,
    },
    chocolat_au_lait_caramel_sel_de_guerande_bio_equitable: {
      uuid: '71395469-c126-599b-bfc5-d2c81dce0d16',
      name: 'Chocolat au Lait, caramel & sel de Guérande- BIO + équitable',
      category: 'A grignoter',
      description:
        "Un petit conseil si vous optez pour ce chocolat en petit encas : cachez le ! N'importe quel collègue un peu gourmand peut reconnaitre le bruit d'un papier de chocolat à 3 bureaux à la ronde !",
      image:
        'medias/groceries/chocolat_au_lait_caramel_sel_de_guerande_bio_equitable.jpg',
      price: 1500,
    },
    adonis_coconut_vanilla_acai_berry: {
      uuid: '1d674b67-07d6-599a-a7e9-bdb84f399ada',
      name: 'Adonis Coconut, vanilla & Acaï berry',
      category: 'A grignoter',
      description:
        "Quelques crocs qui font voyager, on dit merci la barre noix de coco, vanille et baies d'Açaï ! Une barre de céréales faible en sucre (seulement 2g pour 1 barre), vegan et peu calorique : c'est l'encas qu'il vous faut !",
      image: 'medias/groceries/adonis_coconut_vanilla_acai_berry.jpg',
      price: 1500,
    },
    '1001_graines': {
      uuid: '41663bb1-d4ed-56b1-957f-9b5abebb2841',
      name: '1001 graines',
      category: 'A grignoter',
      description:
        'Un cocktail de graines idéal pour les petits coups de mous passagers ! Avec ça, vous serez au taquet pour affronter tous les imprévus de la journée!',
      image: 'medias/groceries/1001_graines.jpg',
      price: 1500,
    },
    chocolat_extra_noir_70_selection_de_madagascar: {
      uuid: '29aa1e1a-4c3f-5cbe-aa4b-33e39eaeab5f',
      name: 'Chocolat extra Noir 70% - Sélection de Madagascar',
      category: 'A grignoter',
      description:
        'Ce chocolat extra noir est EXTREmement délicieux, on vous aura prévenu !',
      image:
        'medias/groceries/chocolat_extra_noir_70_selection_de_madagascar.jpg',
      price: 1500,
    },
    banana_split: {
      uuid: 'ca5db8d8-140d-595f-92ec-224b50624e9b',
      name: 'Banana split',
      category: 'A grignoter',
      description:
        "Se faire du bien et plaisir en même temps c'est possible ! Ce mélange gourmand alliant banane, noix de cajoux, fraise & chocolat le prouve !",
      image: 'medias/groceries/banana_split.jpg',
      price: 2000,
    },
    carres_caramel_chocolat_lait: {
      uuid: 'cb7d52f3-b824-5a0d-9459-a42c504e8a5e',
      name: 'Carrés caramel chocolat lait',
      category: 'A grignoter',
      description:
        "Défi, ouvrir le paquet et ne manger qu'un carré ! Haha non on plaisante, quelle drôle d'idée : dévorez tout !",
      image: 'medias/groceries/carres_caramel_chocolat_lait.png',
      price: 2500,
    },
    chocolat_bio_noir_haiti_ethiquable: {
      uuid: '2e6c4609-296e-5488-b7c7-5ebaab9b6d95',
      name: 'Chocolat bio noir Haïti Ethiquable',
      category: 'A grignoter',
      description:
        "Un carré entre chaque réunion, c'est le secret pour garder la forme !",
      image: 'medias/groceries/chocolat_bio_noir_haiti_ethiquable.jpg',
      price: 2600,
    },
    bonbons_happy_box_haribo: {
      uuid: '0489553e-b50c-5934-b290-2289a72a78b7',
      name: 'Bonbons Happy Box Haribo',
      category: 'A grignoter',
      description:
        'Le bonheur tient dans une boite: un assortiment de tous vos bonbons préférés !',
      image: 'medias/groceries/bonbons_happy_box_haribo.jpg',
      price: 4800,
    },
    tartelettes_choco_caramel: {
      uuid: 'f6183fa5-ea26-57df-b0ca-6e2f93be29e8',
      name: 'Tartelettes choco caramel',
      category: 'Les petites courses sucrées',
      description:
        'Ces tartelettes Bonne Maman sont de véritables pépites ! Avec leur caramel fondant et leur chocolat au lait croquant on se régale à coup sûr ! ',
      image: 'medias/groceries/tartelettes_choco_caramel.jpg',
      price: 1700,
    },
    sucre_en_poudre_bio_saint_louis: {
      uuid: 'c15c187f-40e0-5505-ae0e-748f879eea5f',
      name: 'Sucre en poudre BIO Saint Louis',
      category: 'Les petites courses sucrées',
      description:
        "Le genre de choses qu'on oublie tout le temps en faisant nos courses, et pourtant les gâteaux c'est meilleur avec un peu de sucre non ?",
      image: 'medias/groceries/sucre_en_poudre_bio_saint_louis.jpg',
      price: 1900,
    },
    etui_de_2_sachets_d_infusion: {
      uuid: '8d0daa30-c7f9-5504-b833-c0d8c0c4c20d',
      name: "Etui de 2 sachets d'infusion",
      category: 'Les petites courses sucrées',
      description:
        "Chic des plantes c'est une marque d'infusion 100% bio, 100% délicieuse qui vous propose un étui avec : \r\nÔ Joie, une infusion vitalisante au goût fruis et fruité à base d'ananas, de menthe et de ginkgo\r\nPousse Délice, une infusion parfaite pour la digestion à base de fenouil, romarain, verveine et menthe poivrée",
      image: 'medias/groceries/etui_de_2_sachets_d_infusion.jpg',
      price: 2000,
    },
    dinosaurus_chocolat_noir: {
      uuid: '2e379033-1bc8-5a02-88d7-c39cb1599ff5',
      name: 'Dinosaurus chocolat noir',
      category: 'Les petites courses sucrées',
      description:
        "Avec ces dinosaurus impossible d'être déçu: croquant, gourmand, et ultra chocolat ! Miam !",
      image: 'medias/groceries/dinosaurus_chocolat_noir.jpg',
      price: 2200,
    },
    the_bio_vert_gingembre_citron_vert_ethiquable: {
      uuid: '12c61510-192e-5f69-ab6c-48f89b22a34b',
      name: 'Thé bio vert gingembre citron vert Ethiquable',
      category: 'Les petites courses sucrées',
      description:
        'Une tasse de thé, on inspire, on expire et tout va déjà mieux !',
      image:
        'medias/groceries/the_bio_vert_gingembre_citron_vert_ethiquable.jpg',
      price: 2900,
    },
    pate_a_tartiner_chocolat_noisettes_bio_jardin_bio: {
      uuid: 'd6743669-4076-56a1-842f-c2e88605b579',
      name: 'Pâte à tartiner chocolat/noisettes Bio Jardin Bio',
      category: 'Les petites courses sucrées',
      description:
        'Ne culpabilisez pas, cette pâte à tartiner est bio, sans huile de palme et délicieuse !',
      image:
        'medias/groceries/pate_a_tartiner_chocolat_noisettes_bio_jardin_bio.jpg',
      price: 3500,
    },
    cafe_capsules_bolivie_compatible_nespresso_n_6_bio_le_torrefacteur: {
      uuid: '1c7e73e4-9804-5fc6-a32e-9ebbc6b101ba',
      name: 'Café capsules Bolivie compatible Nespresso n°6 Bio Le Torrefacteur',
      category: 'Les petites courses sucrées',
      description:
        'Pour ne plus avoir à faire le tour des bureaux en disant : "Quelqu\'un aurait un petit café pour moi ?"',
      image:
        'medias/groceries/cafe_capsules_bolivie_compatible_nespresso_n_6_bio_le_torrefacteur.jpg',
      price: 3900,
    },
    cafe_moulu_max_havelaar_malongo: {
      uuid: '2f715269-aa24-57c1-9f73-68946c593433',
      name: 'Café moulu Max Havelaar MALONGO',
      category: 'Les petites courses sucrées',
      description:
        'Sauvez la journée de tout le bureau en ramenant du café pour la machine !',
      image: 'medias/groceries/cafe_moulu_max_havelaar_malongo.png',
      price: 3950,
    },
    sauce_tomate_a_la_provencale_rdf: {
      uuid: '369cb2a6-fee0-5a23-bff2-8bcc77e73fb3',
      name: 'Sauce tomate à la provençale RDF',
      category: 'Les petites courses salées',
      description:
        "Il n'y a pas plus beau voyage que de mettre un peu de soleil provençal dans ses pâtes !",
      image: 'medias/groceries/sauce_tomate_a_la_provencale_rdf.jpg',
      price: 1450,
    },
    chips_legeres_salees_tyrrells: {
      uuid: '1948a5a1-a421-54dc-9f88-c23c53d3bb3c',
      name: 'Chips légères salées Tyrrells',
      category: 'Les petites courses salées',
      description:
        "Les chips c'est meilleur avec les doigts ! Alors Hop on picore, on se régale (et on en laisse pas une miette) ! ",
      image: 'medias/groceries/chips_legeres_salees_tyrrells.jpg',
      price: 2500,
    },
    cristaline_1_5l: {
      uuid: 'b6c4f78f-87e7-5a91-9129-d4eb9ebd545f',
      name: 'Cristaline 1,5L',
      category: 'Les petites courses salées',
      description: 'Parfait pour une étancher une grande soif !',
      image: 'medias/groceries/cristaline_1_5l.png',
      price: 2500,
    },
    cristaline_gazeuse_1_5l: {
      uuid: 'df06230d-1b73-54c6-b9af-afc85b0797ca',
      name: 'Cristaline gazeuse 1,5L',
      category: 'Les petites courses salées',
      description: "Mettre des bulles dans sa vie, c'est capital !",
      image: 'medias/groceries/cristaline_gazeuse_1_5l.png',
      price: 2500,
    },
    kit_apero_chips: {
      uuid: 'a849e77e-02bc-5086-a965-9e8041b7dd42',
      name: 'Kit apéro chips',
      category: 'A partager',
      description:
        "Vous ramenez quoi pour l'apéro ? Une bière et des chips : simple et efficace !",
      image: 'medias/groceries/kit_apero_chips.jpg',
      price: 5500,
    },
    kit_couverts_6_pieces_noires_cpla_pla_minimum_a_commander_96_colis: {
      uuid: '3167b7ea-80fc-5c96-9022-6857a1706651',
      name: 'Kit couverts 6 pièces noires CPLA + PLA Minimum à commander : 96 colis',
      category: 'Nos couverts',
      description:
        'Un kit de couverts en amidon de maïs avec serviette, sel, et poivre pour vos déjeuners au bureau ! ',
      image:
        'medias/groceries/kit_couverts_6_pieces_noires_cpla_pla_minimum_a_commander_96_colis.jpg',
      price: 200,
    },
    set_couverts_lavables_3_pcs_rouge_dejbox: {
      uuid: '27bf864b-03b1-50fe-b890-b21e679b6bf3',
      name: 'Set couverts lavables 3 pcs rouge DEJBOX',
      category: 'Nos couverts',
      description:
        "Un kit de couverts réutilisable à l'infini pour vos déjeuners au bureau!",
      image: 'medias/groceries/set_couverts_lavables_3_pcs_rouge_dejbox.jpg',
      price: 1900,
    },
  },
  beforeLoad: [
    async (
      item: GroceryCollection,
      storageService: StorageService,
      config: ConfigService,
    ) => {
      const version = config.get<AppConfig>('app').version;
      const imageName = `${item.uuid}${path.extname(item.image)}`;
      const key = `${version}/catalog/groceries/${imageName}`;

      await storageService
        .getDisk<S3Storage>('statics')
        .put(key, fs.createReadStream(path.join(__dirname, item.image)), {
          ACL: 'public-read',
          ContentType: 'image/jpg',
          ContentDisposition: 'inline',
        });

      item.image = storageService.getDisk('statics').getUrl(key);

      return item;
    },
    [StorageService, ConfigService],
  ],
};
