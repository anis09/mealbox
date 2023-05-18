import { DrinkSchemaName, DrinkCollection } from '../schemas';
import { StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app.config';
import { S3Storage } from '../../common';
import * as path from 'path';
import * as fs from 'fs';

export default {
  schemaName: DrinkSchemaName,
  class: DrinkCollection,
  items: {
    jus_energie_cherie: {
      uuid: '038407b5-e7f9-59a7-928e-bc9affd07746',
      name: 'Jus Energie cherie',
      category: 'Nos jus & smoothies',
      description:
        'Hop ! Une gorgée de ce flacon, et tous vos collègues voudront connaitre le secret de votre suuuuuper forme de l’après-midi!',
      image: 'medias/drinks/jus_energie_cherie.jpg',
      price: 3000,
    },
    smoot_mang_pas_250_innocent: {
      uuid: '29fb9f58-79fa-59be-b1f0-bca2cfdb30f1',
      name: 'Smoot mang pas 250 INNOCENT',
      category: 'Nos jus & smoothies',
      description:
        "Ce smoothie mangue et fruits de la passion est l'incontournable de chez innocent ! Gouter-le, et jugez par vous même :-)",
      image: 'medias/drinks/smoot_mang_pas_250_innocent.jpg',
      price: 3000,
    },
    cristaline_50_cl: {
      uuid: 'e7ebacc2-e944-5a0a-a179-ffdc996d29ef',
      name: 'Cristaline 50 cl',
      category: 'Nos eaux',
      description: "L'eau, à boire sans modération et bien plus encore !",
      image: 'medias/drinks/cristaline_50_cl.jpg',
      price: 1500,
    },
    cristaline_gazeuse_50_cl: {
      uuid: '7bd07ef4-fb02-5f05-a436-cd56e44a0d4a',
      name: 'Cristaline gazeuse 50 cl',
      category: 'Nos eaux',
      description: 'Des petites bulles pour ce midi ?',
      image: 'medias/drinks/cristaline_gazeuse_50_cl.jpg',
      price: 1500,
    },
    volvic_zest_citron_pet_24x50cl: {
      uuid: '3df697d0-96cd-5eb0-a054-69bf11388cac',
      name: 'Volvic zest citron pet 24x50cl',
      category: 'Nos eaux',
      description: "De l'eau et du citron, tout simplement.",
      image: 'medias/drinks/volvic_zest_citron_pet_24x50cl.jpg',
      price: 2000,
    },
    fanta_orange_slim_bte_24x33cl: {
      uuid: '39d31912-4a51-59d5-9d1b-0f9a3d27d9a5',
      name: 'Fanta orange slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description: "De l'acidulé et du pétillant s'il vous plait !",
      image: 'medias/drinks/fanta_orange_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    coca_cola_zero_slim_bte_24x33cl: {
      uuid: '10bf3fc5-90de-5c61-8d1d-57677c4bcef3',
      name: 'Coca-cola zero slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description:
        "Un incontournable, un coup de pep's qui rafraîchit bien comme il faut ! :-)",
      image: 'medias/drinks/coca_cola_zero_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    fuze_tea_citron_vert_menthe: {
      uuid: '67439c3a-29a1-5f26-af55-761049984c25',
      name: 'Fuze Tea Citron Vert Menthe',
      category: 'Nos sodas & thés glacés',
      description:
        'Ce thé glacé saveur citron vert et menthe est la boisson idéale pour se rafraichir et se faire plaisir ! (et ça rime!)',
      image: 'medias/drinks/fuze_tea_citron_vert_menthe.jpg',
      price: 1500,
    },
    coca_cola_slim_bte_24x33cl: {
      uuid: '3ba4312c-4b20-5d27-af14-f42e265cf938',
      name: 'Coca-cola slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description: "L'indétrônable, le vrai Coca-Cola !",
      image: 'medias/drinks/coca_cola_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    fuzetea_peche_gourmande_slim_bte_24x33cl: {
      uuid: '501ea777-b88f-59f2-a58d-68f9449df360',
      name: 'Fuzetea pêche gourmande slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description: 'Un bon petit thé glacé à la pêche pour se détendre !',
      image: 'medias/drinks/fuzetea_peche_gourmande_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    coca_cola_light_slim_bte_24x33cl: {
      uuid: '956bfeb6-5035-5a6f-a837-07d64dc1cab8',
      name: 'Coca-cola light slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description: 'La boisson qui va avec absolument... tout !',
      image: 'medias/drinks/coca_cola_light_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    sprite_slim_bte_24x33cl: {
      uuid: '1d0e1183-32b3-5617-8a59-266d3383bbc7',
      name: 'Sprite slim bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description: 'La boisson rafraîchissante par excellence ! ',
      image: 'medias/drinks/sprite_slim_bte_24x33cl.jpg',
      price: 1500,
    },
    minute_maid_pomme_bte_24x33cl: {
      uuid: '394e3ade-af85-59f2-bedd-102706676b45',
      name: 'Minute maid pomme bte 24x33cl',
      category: 'Nos sodas & thés glacés',
      description:
        '33 cl de vitamines, de fraîcheur, de goût sucré et acidulé !',
      image: 'medias/drinks/minute_maid_pomme_bte_24x33cl.jpg',
      price: 2000,
    },
    kombucha_bio_originial: {
      uuid: '91f57fb5-b1e1-5f23-8c09-46e95d3b8e0d',
      name: 'Kombucha Bio - Originial',
      category: 'Nos sodas & thés glacés',
      description:
        "Ce kombucha bio au goût inégalable risque de devenir votre allié de pause déjeuner ! Le gôuter c'est l'adopter...",
      image: 'medias/drinks/kombucha_bio_originial.jpg',
      price: 3000,
    },
  },
  beforeLoad: [
    async (
      item: DrinkCollection,
      storageService: StorageService,
      config: ConfigService,
    ) => {
      const version = config.get<AppConfig>('app').version;
      const imageName = `${item.uuid}${path.extname(item.image)}`;
      const key = `${version}/catalog/drinks/${imageName}`;

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
