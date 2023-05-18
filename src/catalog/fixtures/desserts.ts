import { DessertSchemaName, DessertCollection } from '../schemas';
import { StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app.config';
import { S3Storage } from '../../common';
import * as path from 'path';
import * as fs from 'fs';

export default {
  schemaName: DessertSchemaName,
  class: DessertCollection,
  items: {
    maxi_cookie_3_chocolats: {
      uuid: 'aebb3da6-69da-566e-9f35-a517340cb627',
      name: 'Maxi cookie 3 chocolats',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Du chocolat et encore du chocolat, on peut faire tout ce qu'on veut, on ne s'en lasse pas ! Et avec ce cookie c'est juste du bonheur !",
      image: 'medias/desserts/maxi_cookie_3_chocolats.jpg',
      price: 1500,
    },
    brownie: {
      uuid: '6469676c-55e3-50b4-b291-ffc628a39aaa',
      name: 'Brownie',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Ceci est une alerte à la gourmandise ! Vous vous demandez comment vous avez fait jusqu'à maintenant pour vivre sans ce brownie au chocolat? Nous aussi.",
      image: 'medias/desserts/brownie.jpg',
      price: 1500,
    },
    cannele_bordelais: {
      uuid: '276ec1a5-6089-5af4-ad5d-d73fadf01ab1',
      name: 'Cannelé bordelais',
      category: 'Nos pâtisseries & gourmandises',
      description:
        'Envie d’une petite douceur ? Ce cannelé est fait pour vous ! Vous pouvez nous croire, celui-ci est particulièrement délicieux. Sa texture est idéale et on retrouve tout le goût du vrai cannelé, hmmm !',
      image: 'medias/desserts/cannele_bordelais.jpg',
      price: 1500,
    },
    cake_pain_d_epices: {
      uuid: '485fb870-512c-5c6a-8132-091c57b6c51f',
      name: "Cake pain d'épices",
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Une bouchée de ce petit cake au pain d'épice, et vous allez être transporté dans l'ambiance de fin d'année ! Du miel & des épices pour faire le plein de douceur et de gourmandise !",
      image: 'medias/desserts/cake_pain_d_epices.jpg',
      price: 1500,
    },
    moelleux_chocolat: {
      uuid: '60781909-e291-5fad-a542-f0294e53ec21',
      name: 'Moelleux chocolat',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Attention DANGER : risque d'addiction ! Tellement gourmand et réconfortant, on fond pour son cœur coulant au chocolat ...",
      image: 'medias/desserts/moelleux_chocolat.jpg',
      price: 2000,
    },
    mousse_au_chocolat_beurre_1_2_sel: {
      uuid: '5e98b3a5-4a56-5a95-94e6-dff3c1cd9729',
      name: 'Mousse au chocolat beurre 1/2 sel',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Un peu de mousse et beaucoup de chocolat : c'est la recette d'une mousse au chocolat au top !",
      image: 'medias/desserts/mousse_au_chocolat_beurre_1_2_sel.jpeg',
      price: 2000,
    },
    la_tartelette_au_citron_meringuee: {
      uuid: 'c7a6fcba-f552-590d-8706-b1db1da3c2e6',
      name: 'La tartelette au citron meringuée',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Impossible de se tromper avec ce grand classique des desserts : la tarte citron meringuée ! Acidulée, sucrée et terriblement gourmande, on l'adore !",
      image: 'medias/desserts/la_tartelette_au_citron_meringuee.jpeg',
      price: 2500,
    },
    la_tartelette_aux_pommes: {
      uuid: 'f070a2b2-df40-54e5-88da-eb907c6abd01',
      name: 'La tartelette aux pommes',
      category: 'Nos pâtisseries & gourmandises',
      description:
        'Un grand classique dont on ne se lassera jamais, la fameuse tartelette aux pommes. Fruitée, gourmande, on l’adore !',
      image: 'medias/desserts/la_tartelette_aux_pommes.jpg',
      price: 2500,
    },
    tiramisu: {
      uuid: '7d3d9d56-4d53-58a0-8332-975c26d89e1c',
      name: 'Tiramisu',
      category: 'Nos pâtisseries & gourmandises',
      description:
        'Mamamia ! Comment résister à un tiramisu ? Nous n’avons pas la réponse, alors on y succombe avec gourmandise !',
      image: 'medias/desserts/tiramisu.jpg',
      price: 3500,
    },
    dolce_and_banana: {
      uuid: 'dcafe98c-05ea-5c33-a724-350303adf0a4',
      name: 'DOLCE AND BANANA',
      category: 'Nos pâtisseries & gourmandises',
      description:
        "Une crème au chocolat vegan, mais quel est le secret de notre partenaire My Healthy Food ? Du lait de coco pour la crème et des bananes coupées en rondelle juste parce que c'est trop bon !",
      image: 'medias/desserts/dolce_and_banana.jpg',
      price: 4000,
    },
    compote_pomme_bio: {
      uuid: '66afbf93-03a0-5315-9c7b-a86efcbf16b0',
      name: 'Compote Pomme Bio',
      category: 'Nos compotes & yaourts',
      description:
        "Pourquoi chercher quand la meilleure des compotes, c'est celle à la pomme ! Tout simplement !",
      image: 'medias/desserts/compote_pomme_bio.jpg',
      price: 1500,
    },
    compote_pomme_vanille: {
      uuid: 'b50389fd-9718-53b7-89bf-6f5a163219fb',
      name: 'Compote pomme vanille',
      category: 'Nos compotes & yaourts',
      description: 'Une compote à la vanille et tout va mieux !',
      image: 'medias/desserts/compote_pomme_vanille.jpg',
      price: 1500,
    },
    yaourt_noix_de_coco_pot_carton125_gr: {
      uuid: 'ba1dd77f-5a41-520c-a8d2-a7ea2c7d3722',
      name: 'Yaourt noix de coco pot carton125 gr',
      category: 'Nos compotes & yaourts',
      description: "Yaourt Malo saveur coco : un avant goût de l'été ! :)",
      image: 'medias/desserts/yaourt_noix_de_coco_pot_carton125_gr.jpg',
      price: 1500,
    },
    fromage_frais_nature_malo_0_100g: {
      uuid: '19441a7d-45c0-50d1-91de-97ed03b2ef3a',
      name: 'Fromage Frais Nature Malo 0% 100g',
      category: 'Nos compotes & yaourts',
      description:
        'Nature, avec des petites graines, du chocolat, du miel : quoique vous fassiez de ce fromage frais 0%, ce sera un délice !',
      image: 'medias/desserts/fromage_frais_nature_malo_0_100g.jpg',
      price: 1500,
    },
    fromage_blanc_miel_granola: {
      uuid: 'af0d3be5-a741-5ab1-a141-5b87d4b81b08',
      name: 'Fromage blanc miel granola',
      category: 'Nos compotes & yaourts',
      description:
        'Une valeur sûre dont on ne lasse pas: fromage blanc, miel et granola, la combinaison parfaite pour se régaler sans culpabiliser :-)',
      image: 'medias/desserts/fromage_blanc_miel_granola.jpg',
      price: 3000,
    },
    pineapple_of_my_eye: {
      uuid: '618e8965-dc29-5f6b-8941-1fd053e82994',
      name: 'PINEAPPLE OF MY EYE',
      category: 'Nos compotes & yaourts',
      description:
        'Un voyage aux topiques et des airs de Piña Colada avec cette panna cotta végétale accompagnée\r\n d’une compotée d’ananas. Le tout fait-maison et sans sucre raffiné !',
      image: 'medias/desserts/pineapple_of_my_eye.jpg',
      price: 4000,
    },
    la_pomme: {
      uuid: '0c5ffab0-b90f-5eec-ac4b-852a38a31f75',
      name: 'La pomme',
      category: 'Nos fruits',
      description: 'An apple a day keeps the doctor away ; )',
      image: 'medias/desserts/la_pomme.jpg',
      price: 1500,
    },
    banane: {
      uuid: 'ca22a8a1-d71b-54df-9637-b327b48abb66',
      name: 'Banane',
      category: 'Nos fruits',
      description:
        'Vous connaissez l\'expression "avoir la banane" ? Et bien vous pouvez maintenant l\'appliquer à la lettre !',
      image: 'medias/desserts/banane.png',
      price: 1500,
    },
    salade_5_fruits: {
      uuid: 'f87fa54d-be8c-567d-b15e-8d8f370c5b13',
      name: 'Salade 5 fruits',
      category: 'Nos fruits',
      description:
        "La salade de fruits, c'est le dessert de notre enfance : c'est bon, c'est sucré, c'est frais et ça fait du bien !",
      image: 'medias/desserts/salade_5_fruits.jpg',
      price: 2000,
    },
    segments_orange_100_gr_dlc_11_jours: {
      uuid: '5db9652c-d94e-5041-a00f-23c7cc8479c1',
      name: 'Segments Orange 100 gr DLC 11 jours',
      category: 'Nos fruits',
      description:
        "Des segments d'orange anti coup de mou, ça vous dit ? Pour une journée ultra productive, c'est la solution !",
      image: 'medias/desserts/segments_orange_100_gr_dlc_11_jours.jpg',
      price: 2000,
    },
  },
  beforeLoad: [
    async (
      item: DessertCollection,
      storageService: StorageService,
      config: ConfigService,
    ) => {
      const version = config.get<AppConfig>('app').version;
      const imageName = `${item.uuid}${path.extname(item.image)}`;
      const key = `${version}/catalog/desserts/${imageName}`;

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
