import { MealSchemaName, MealCollection } from '../schemas';
import { StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app.config';
import { S3Storage } from '../../common';
import * as path from 'path';
import * as fs from 'fs';

export default {
  schemaName: MealSchemaName,
  class: MealCollection,
  items: {
    nouilles_singapour_poulet: {
      uuid: '3f2e3683-72c3-5992-9d0d-b0e564f6c257',
      name: 'Nouilles Singapour poulet',
      category: "Nos envies d'ailleurs",
      description:
        "De tendres morceaux de blanc de poulet marinés, des nouilles délicieusement parfumées au soja et au curry : il y a de fortes chances pour que vous soyez vite accro à ce plat tout droit venu d'Asie.",
      image: 'medias/meals/nouilles_singapour_poulet.jpg',
      price: 7900,
    },
    pad_thai: {
      uuid: 'b1857cb9-49e5-5459-877d-4fb645b7e901',
      name: 'Pad thaï',
      category: "Nos envies d'ailleurs",
      description:
        "Le pad thaï c'est le plat thaïlandais par excellence ! La tradition du goût est largement retrouvée avec notre fabuleuse recette inspirée des plus grands ! Vous n'allez pas être déçu, c'est certain !",
      image: 'medias/meals/pad_thai.jpg',
      price: 7900,
    },
    curry_de_pois_chiche_riz_basmati: {
      uuid: '04d0471a-4ee0-51dd-ae18-ab0ca8582a35',
      name: 'Curry de pois chiche - Riz Basmati',
      category: "Nos envies d'ailleurs",
      description:
        "Un petit détour le temps de la pause déjeuner, ça vous dit ? Direction l'Inde avec un délicieux curry de pois chiche ! Rien que l'odeur à la réchauffe nous transporte : et surtout nous donne très faim !",
      image: 'medias/meals/curry_de_pois_chiche_riz_basmati.jpg',
      price: 7900,
    },
    le_couscous_au_poulet: {
      uuid: 'e861c214-d990-5d20-856d-4e5d37d8d524',
      name: 'Le couscous au poulet',
      category: "Nos envies d'ailleurs",
      description:
        "Il n'y a rien de tel qu'un bon couscous pour se remettre de tous ses tracas ! On voyage avec des saveurs d'Orient, du bon poulet comme on l'aime... On oublie le travail le temps d'une pause dépaysante, c'est parti !",
      image: 'medias/meals/le_couscous_au_poulet.jpg',
      price: 7900,
    },
    crevettes_sukothai_crevettes_sautees_aux_2_poivres: {
      uuid: '16d45892-2dc3-5a2a-890c-05b5f94e8cdb',
      name: 'Crevettes sukothai / crevettes sautées aux 2 poivres',
      category: "Nos envies d'ailleurs",
      description:
        'Des crevettes comme on les aime, sautées aux 2 poivres pour beaucoup de goût et de bonheur ! Voici une recette Thaï qui va ensoleiller votre pause dej !',
      image:
        'medias/meals/crevettes_sukothai_crevettes_sautees_aux_2_poivres.jpg',
      price: 8900,
    },
    satay_sauce_cacahuete_et_riz: {
      uuid: 'b669b469-9095-5103-b43f-34bf05486020',
      name: 'Satay sauce cacahuète et riz',
      category: "Nos envies d'ailleurs",
      description:
        'Ce plat est une véritable petite perle ! Préparez-vous à goûter une sauce cacahuète onctueuse absolument délicieuse ! Vous allez fondre face à la tendresse de ces blancs de poulet grillés et marinés dans du lait de coco et du curry.',
      image: 'medias/meals/satay_sauce_cacahuete_et_riz.jpg',
      price: 8900,
    },
    poke_saumon: {
      uuid: '272925b0-7978-5bc2-9370-f8c73bde5dd2',
      name: 'Poké saumon',
      category: "Nos envies d'ailleurs",
      description:
        'L’incontournable, celui qui met tout le monde d’accord, LE poke bowl saumon ! Tout y est: le riz vinaigré, le saumon, les edamames, le chou rouge mariné, les radis, l’ananas… le tout accompagné d’une sauce Hawaï pour continuer le voyage !',
      image: 'medias/meals/poke_saumon.jpg',
      price: 10900,
    },
    le_donburi_chicken_balls: {
      uuid: '5f72b9a8-d2cc-57d7-963c-4522e31ac26c',
      name: 'Le donburi chicken balls',
      category: "Nos envies d'ailleurs",
      description:
        "Un donburi chicken balls, qu'est-ce que c'est ? C'est un plat asiatique à base de riz, de boulettes de poulet sauce donburi (une sauce aux douces épices péruviennes, et de l'origan) et un coleslaw nikkei à base de carotte, oignon rouge, poivron rouge, jaune et vert !",
      image: 'medias/meals/le_donburi_chicken_balls.jpg',
      price: 10900,
    },
    torteliini_stilton_tortellinis_aux_4_fromages: {
      uuid: 'b20eee0a-da78-5676-bb84-f561550e7ab4',
      name: 'Torteliini Stilton / Tortellinis aux 4 fromages',
      category: 'Nos grands classiques',
      description:
        'Des tortellini aux 4 fromages, on ne sait pas s’il y a plus réconfortant pour une pause déjeuner au bureau ! C’est gourmand, fondant, bien crémeux bref : c’est délicieux !',
      image: 'medias/meals/torteliini_stilton_tortellinis_aux_4_fromages.jpg',
      price: 7900,
    },
    spaghetti_bolognaise: {
      uuid: '4842fcc2-fd89-5dfe-b5a7-2eace37afc84',
      name: 'Spaghetti bolognaise',
      category: 'Nos grands classiques',
      description:
        "Comment ne pas craquer pour ces superbes spaghetti bolo ? Son secret : du bœuf longuement mijoté dans une sauce tomate cuisinée. On sait parfaitement qu'avec ce plat on ne peut pas se tromper !",
      image: 'medias/meals/spaghetti_bolognaise.jpg',
      price: 7900,
    },
    hachis_parmentier: {
      uuid: '939685df-8318-5f0c-a591-08faddc569b2',
      name: 'Hachis Parmentier',
      category: 'Nos grands classiques',
      description:
        "Ce midi, on part sur l'indétrônable hachis parmentier ! Nous n'avons pas la prétention de faire mieux que votre mamie, mais ce parmentier de boeuf a de quoi vous ravir les papilles.. On vous laisse en juger :-)",
      image: 'medias/meals/hachis_parmentier.jpg',
      price: 7900,
    },
    pennoni_a_la_sauce_jalapeno_les_pennoni_aux_2_poivrons_brocolis_feves: {
      uuid: '5691f8eb-5f43-5716-bc6d-ab1414a29465',
      name: 'Pennoni à la sauce Jalapeno / Les pennoni aux 2 poivrons, brocolis & fèves',
      category: 'Nos grands classiques',
      description:
        "Des couleurs aussi belles que bonnes, un parfum ensoleillé : c'est un sacré programme pour ce midi, vous ne trouvez pas ? Chaud comme froid, on se régale avec ce plat de pâtes aux poivrons rouges et jaunes, brocolis, fèves et une sauce tomate et jalapeno !",
      image:
        'medias/meals/pennoni_a_la_sauce_jalapeno_les_pennoni_aux_2_poivrons_brocolis_feves.jpg',
      price: 7900,
    },
    salade_penne_saumon_emiette_sauce_tartare_aneth: {
      uuid: '85831e6f-3589-5b94-bec0-8ab91da06178',
      name: 'Salade penne, saumon emiétté, sauce tartare, aneth',
      category: 'Nos grands classiques',
      description:
        "Vous êtes gourmands ? Vous aimez le saumon ? Vous adorez quand la sauce rend fou d'amour ? Oh hé bien il semblerait qu'on ait une salade faite pour vous : des pennes, du saumon émietté et une sauce tartare à tomber !",
      image: 'medias/meals/salade_penne_saumon_emiette_sauce_tartare_aneth.jpg',
      price: 7900,
    },
    falafel_ratatouille_riz_safrane: {
      uuid: '05723426-d469-5493-94d0-e56395aef330',
      name: 'Falafel ratatouille riz safrané',
      category: 'Nos plats healthy',
      description:
        'Voyager peut parfois se faire depuis sa chaise... Il suffit de fermer les yeux quelques instants, croquer dans ces falafels, goûter ces aubergines et ce riz safrané et voici que le Moyen-Orient tout entier est face à vous !',
      image: 'medias/meals/falafel_ratatouille_riz_safrane.jpg',
      price: 7900,
    },
    le_colin_crumble_de_parmesan_sa_douce_mousseline_de_carottes: {
      uuid: 'd6a86c47-980d-58f8-aa1d-1210f980e60e',
      name: 'Le colin crumble de parmesan & sa douce mousseline de carottes',
      category: 'Nos plats healthy',
      description:
        "Craquez pour l'incroyable colin au crumble de parmesan et sa mousseline de carottes ! En plus d'être complètement délicieux, certains diront que ça rend aimable :-)",
      image:
        'medias/meals/le_colin_crumble_de_parmesan_sa_douce_mousseline_de_carottes.jpg',
      price: 7900,
    },
    la_salade_de_riz_poulet_a_la_mexicaine_patate_douce_creme_de_poivrons_menthe:
      {
        uuid: '85085ff8-6134-52ba-adf5-bcd8e55aa4c4',
        name: 'La salade de riz, poulet à la mexicaine, patate douce & crème de poivrons menthe',
        category: 'Nos plats healthy',
        description:
          "Le Mexique s'invite à votre table ce midi avec cette délicieuse salade pleine de saveurs: riz, haricots rouges, cubes de patate douce, maïs, et des tendres filets de poulet rôtis origine France ! Une onctueuse crème poivrons menthe vient couronner le tout, et à vous de vous régaler ! Aribaaaaaa !",
        image:
          'medias/meals/la_salade_de_riz_poulet_a_la_mexicaine_patate_douce_creme_de_poivrons_menthe.jpg',
        price: 7900,
      },
    risotto_d_orge_et_gorgonzola: {
      uuid: 'ebf5a754-4ee4-56c2-bd65-02444b657121',
      name: "Risotto d'orge et gorgonzola",
      category: 'Nos plats healthy',
      description:
        "Notre partenaire T'es Trop Fresh nous a mitonné un risotto pas comme les autres : de l'orge, du gorgonzola et des légumes tout doux ! C'est réconfortant, gourmand, ça fait du bien !",
      image: 'medias/meals/risotto_d_orge_et_gorgonzola.jpg',
      price: 7900,
    },
    la_salade_de_houmous_d_epinards_haricots_verts_petits_pois_uf_poche: {
      uuid: '4492184a-7cad-59c7-aa4f-9d5be66d9c3b',
      name: "La salade de houmous d'épinards, haricots verts, petits pois & œuf poché",
      category: 'Nos plats healthy',
      description:
        "Voir la vie en vert, ça vous dit ? C'est en tout cas ce qu'on vous propose avec cette salade toute verte : du houmous d'épinards, des haricots verts et des petits pois ! Et comme pour ajouter de la couleur, mais surtout parce que c'est délicieux, cette salade est accompagné d'un œuf poché !",
      image:
        'medias/meals/la_salade_de_houmous_d_epinards_haricots_verts_petits_pois_uf_poche.jpg',
      price: 7900,
    },
    la_salade_de_lentilles_sauce_gravlax_concombre_saumon: {
      uuid: '55eea95a-4abb-5f8b-9bd3-c9a4175abb3a',
      name: 'La salade de lentilles sauce gravlax, concombre & saumon',
      category: 'Nos plats healthy',
      description:
        'Voilà une salade qui a du goût, qui est copieuse et nous fait envie chaque midi : des lentilles, des concombres, une bonne sauce gravlax vite addictive et du saumon fumé !',
      image:
        'medias/meals/la_salade_de_lentilles_sauce_gravlax_concombre_saumon.jpg',
      price: 7900,
    },
    corcoavocado: {
      uuid: 'c553a4f2-cefe-5a45-890e-27002a64ecb7',
      name: 'CORCOAVOCADO',
      category: 'Nos plats healthy',
      description:
        "Ouh miam miam, My Healthy Food notre partenaire nous régale avec cette salade de quinoa aux légumes croquants et une crème d'avocat toute douce ! Bio, vegan et sans gluten ça c'est bonus !",
      image: 'medias/meals/corcoavocado.jpg',
      price: 8900,
    },
    panama_peppers: {
      uuid: '4786afb1-a209-58cf-acc3-734142bde8c2',
      name: 'PANAMA PEPPERS',
      category: 'Nos plats healthy',
      description:
        "Une salade de riz avec du poulet français, des poivrons marinés au vinaigre balsamique c'est un peu la recette du bonheur façon My Healthy Food !",
      image: 'medias/meals/panama_peppers.jpg',
      price: 8900,
    },
    salade_burrata_foccacia: {
      uuid: '46201d55-2969-5aa3-9452-91db4a38645b',
      name: 'Salade burrata foccacia',
      category: 'Nos plats healthy',
      description:
        "Est-ce qu'il y a meilleur dans ce monde que la burrata ? C'est une vraie question ! En tout cas, en salade, bien crémeuse comme celle-ci vous ne pourrez que fondre ! Et ce n'est pas tout, dans cette salade il y a des courgettes sautées au citron confit, des tomates confites et cerises et clou du spectacle de la foccacia à l'huile d'olive !",
      image: 'medias/meals/salade_burrata_foccacia.jpg',
      price: 8900,
    },
    the_beauty_and_the_beet: {
      uuid: 'dc5af32b-78f7-5222-914c-50f4c8c5415e',
      name: 'THE BEAUTY AND THE BEET',
      category: 'Nos plats healthy',
      description:
        "My Healthy Food c'est notre partenaire spécialié dans le sans gluten, le bio et le vegan ! Preuve en est avec cette salade de brocolis, haricots verts, chou rouge et une délicieuse crème de betterave !",
      image: 'medias/meals/the_beauty_and_the_beet.jpg',
      price: 8900,
    },
    salade_caesar: {
      uuid: '7dcb10c5-fbe2-5383-b33a-e081c51d9fef',
      name: 'Salade caesar',
      category: 'Nos plats healthy',
      description:
        'Une chose est sûre : vous ne resterez pas sur votre faim avec cette salade composée! Avec son poulet , ses croûtons de pains, ses oeufs, son parmigiano, et sa sauce Caesar ! À taaable !',
      image: 'medias/meals/salade_caesar.jpg',
      price: 8900,
    },
    salade_norvegienne: {
      uuid: '97a14168-d4cc-5f70-b91c-5962394fbea7',
      name: 'Salade Norvegienne',
      category: 'Nos plats healthy',
      description: 'Le duo saumon-avocat, un régal pour les papilles !',
      image: 'medias/meals/salade_norvegienne.jpg',
      price: 8900,
    },
  },
  beforeLoad: [
    async (
      item: MealCollection,
      storageService: StorageService,
      config: ConfigService,
    ) => {
      const version = config.get<AppConfig>('app').version;
      const imageName = `${item.uuid}${path.extname(item.image)}`;
      const key = `${version}/catalog/meals/${imageName}`;

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
