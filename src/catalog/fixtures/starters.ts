import { StarterSchemaName, StarterCollection } from '../schemas';
import { StorageService } from '@codebrew/nestjs-storage';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../../config/app.config';
import { S3Storage } from '../../common';
import * as path from 'path';
import * as fs from 'fs';

export default {
  schemaName: StarterSchemaName,
  class: StarterCollection,
  items: {
    salade_individuelle: {
      uuid: 'bb692233-353a-5dab-bbd2-f3f43cfe46ad',
      name: 'Salade individuelle',
      category: 'Nos entrées',
      description:
        "Toute simple, cette salade verte accompagnera à merveille tout ce que vous voulez ! Croquante, fraîche, on l'adore !",
      image: 'medias/starters/salade_individuelle.jpg',
      price: 1500,
    },
    houmous: {
      uuid: 'd75e33d3-17a1-57bb-b73d-01c728325989',
      name: 'Houmous',
      category: 'Nos entrées',
      description:
        "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
      image: 'medias/starters/houmous.jpg',
      price: 2500,
    },
    dip_houmous_zhoug: {
      uuid: '91776ac3-bb0f-5565-8b26-f633f5f80f3f',
      name: 'Dip houmous & Zhoug',
      category: 'Nos entrées',
      description:
        "Le houmous vous connaissez, mais connaissez-vous le houmous au zhoug ? Le zhoug c'est un condiment venu du Yémen, bien épicé qui donne un goût si particulier et addictif à ce houmous !",
      image: 'medias/starters/dip_houmous_zhoug.jpg',
      price: 3000,
    },
    tomates_confites: {
      uuid: '017604ba-307d-5def-b015-6d0faa2063c6',
      name: 'Tomates confites',
      category: 'Nos entrées',
      description:
        "Des tomates séchées dans un peu d'huile, du sel, de l'ail, de basilic et de l'origan c'est absolument ce qu'il vous faut pour grignoter avant d'attaquer le déjeuner !",
      image: 'medias/starters/tomates_confites.jpg',
      price: 3000,
    },
    souffle_au_chorizo: {
      uuid: '9bb6abfe-7a3b-5da6-89b2-cdc5a616a8f7',
      name: 'Soufflé au chorizo',
      category: 'Nos entrées',
      description:
        "Tendre et moelleux à souhait, ce soufflé au chorizo va vite devenir l'accompagnement incontournable de vos déjeuners ! Aussi bon chaud que froid, c'est la régalade assurée !",
      image: 'medias/starters/souffle_au_chorizo.jpg',
      price: 3000,
    },
    dip_cream_cheese_oignon_frit: {
      uuid: 'b0876fce-dc50-51dc-8e87-1fd3c8e979fc',
      name: 'Dip cream cheese oignon frit',
      category: 'Nos entrées',
      description:
        "Le cream cheese c'est ce qu'on peut mettre en base d'un sandwich ou d'un bagel, mais ce cream cheese aux oignons frits est tellement bon que c'est bien plus que ça !",
      image: 'medias/starters/dip_cream_cheese_oignon_frit.jpg',
      price: 3000,
    },
    lentille_corail: {
      uuid: 'b77df55f-08fc-5b07-a00f-83cf71965286',
      name: 'Lentille corail',
      category: 'Nos entrées',
      description:
        "Il n'y aura pas meilleure compagnie pour votre barquette que cette délicieuse salade de lentilles corail, fèves, courgettes et crème au fromage frais !",
      image: 'medias/starters/lentille_corail.jpg',
      price: 3000,
    },
    houmous_legumes: {
      uuid: 'eff86b85-1963-5955-afc3-cb0cac9e008a',
      name: 'Houmous légumes',
      category: 'Nos entrées',
      description:
        'Idéale pour entamer votre déjeuner, cette salade de houmous, poivrons grillés, pois chiche, courgettes et olives noires !',
      image: 'medias/starters/houmous_legumes.jpg',
      price: 3000,
    },
  },
  beforeLoad: [
    async (
      item: StarterCollection,
      storageService: StorageService,
      config: ConfigService,
    ) => {
      const version = config.get<AppConfig>('app').version;
      const imageName = `${item.uuid}${path.extname(item.image)}`;
      const key = `${version}/catalog/starters/${imageName}`;

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
