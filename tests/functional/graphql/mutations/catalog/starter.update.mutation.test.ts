import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import {
  StarterDocument,
  StarterSchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] starter update', () => {
  let app: INestApplication;
  let uuidExcept: string;

  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    uuidExcept = uuid();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (!app) {
      return;
    }

    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('update all fields', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 2500,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Dip houmous & Zhoug',
                category: 'Nos entrées',
                description:
                  "Le houmous vous connaissez, mais connaissez-vous le houmous au zhoug ? Le zhoug c'est un condiment venu du Yémen, bien épicé qui donne un goût si particulier et addictif à ce houmous !",
                image: 'medias/starters/dip_houmous_zhoug.jpg',
                price: 3000,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Dip houmous & Zhoug');
            expect(meal.category).toEqual('Nos entrées');
            expect(meal.description).toEqual(
              "Le houmous vous connaissez, mais connaissez-vous le houmous au zhoug ? Le zhoug c'est un condiment venu du Yémen, bien épicé qui donne un goût si particulier et addictif à ce houmous !",
            );
            expect(meal.image).toEqual('medias/starters/dip_houmous_zhoug.jpg');
            expect(meal.price).toEqual(3000);
          });
      });
  });

  it('update the name field', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 2500,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Dip houmous',
                category: 'Nos entrées',
                description:
                  "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
                image: 'medias/starters/houmous.jpg',
                price: 2500,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Dip houmous');
            expect(meal.category).toEqual('Nos entrées');
            expect(meal.description).toEqual(
              "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
            );
            expect(meal.image).toEqual('medias/starters/houmous.jpg');
            expect(meal.price).toEqual(2500);
          });
      });
  });

  it('update the category field', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 2500,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Houmous',
                category: 'Entrées',
                description:
                  "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
                image: 'medias/starters/houmous.jpg',
                price: 2500,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Houmous');
            expect(meal.category).toEqual('Entrées');
            expect(meal.description).toEqual(
              "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
            );
            expect(meal.image).toEqual('medias/starters/houmous.jpg');
            expect(meal.price).toEqual(2500);
          });
      });
  });

  it('update the description field', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 2500,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Houmous',
                category: 'Nos entrées',
                description:
                  "Le houmous vous connaissez, mais connaissez-vous le houmous au zhoug ? Le zhoug c'est un condiment venu du Yémen, bien épicé qui donne un goût si particulier et addictif à ce houmous !",
                image: 'medias/starters/houmous.jpg',
                price: 2500,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Houmous');
            expect(meal.category).toEqual('Nos entrées');
            expect(meal.description).toEqual(
              "Le houmous vous connaissez, mais connaissez-vous le houmous au zhoug ? Le zhoug c'est un condiment venu du Yémen, bien épicé qui donne un goût si particulier et addictif à ce houmous !",
            );
            expect(meal.image).toEqual('medias/starters/houmous.jpg');
            expect(meal.price).toEqual(2500);
          });
      });
  });

  it('update the image field', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 2500,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Houmous',
                category: 'Nos entrées',
                description:
                  "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
                image: 'medias/starters/dip_houmous_zhoug.jpg',
                price: 2500,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Houmous');
            expect(meal.category).toEqual('Nos entrées');
            expect(meal.description).toEqual(
              "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
            );
            expect(meal.image).toEqual('medias/starters/dip_houmous_zhoug.jpg');
            expect(meal.price).toEqual(2500);
          });
      });
  });

  it('update the price field', () => {
    return app
      .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Houmous',
        category: 'Nos entrées',
        description:
          "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
        image: 'medias/starters/houmous.jpg',
        price: 3000,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: StarterUpdateInput!) {
                  starterUpdate(StarterUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'Houmous',
                category: 'Nos entrées',
                description:
                  "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
                image: 'medias/starters/houmous.jpg',
                price: 2500,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterUpdate: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('Houmous');
            expect(meal.category).toEqual('Nos entrées');
            expect(meal.description).toEqual(
              "Avons-nous besoin de vous présenter l'incontournable et délicieux houmous de pois chiche ? En entrée avec un peu de pain, pour un apéro ou juste pour le plaisir de le manger.",
            );
            expect(meal.image).toEqual('medias/starters/houmous.jpg');
            expect(meal.price).toEqual(2500);
          });
      });
  });
});
