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
  MealDocument,
  MealSchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] meal update', () => {
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

  it('update all fields of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        prcie: 10,
        category: 'cuisine tunisienne',
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: MealUpdateInput!) {
                  mealUpdate(MealUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'lasagne',
                description: 'description lasagne',
                price: 15,
                category: 'cuisine italienne',
                image: 'lasagne.jpg',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('lasagne');
            expect(meal.description).toEqual('description lasagne');
            expect(meal.price).toEqual(15);
            expect(meal.category).toEqual('cuisine italienne');
            expect(meal.image).toEqual('lasagne.jpg');
          });
      });
  });

  it('update the name of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        price: 20,
        category: 'cuisine tunisienne',
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: MealUpdateInput!) {
                  mealUpdate(MealUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'lasagne',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('lasagne');
            expect(meal.description).toEqual('description couscous');
            expect(meal.price).toEqual(20);
            expect(meal.category).toEqual('cuisine tunisienne');
            expect(meal.image).toEqual('couscous.jpg');
          });
      });
  });

  it('update the description of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        category: 'cuisine tunisienne',
        price: 15,
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
              mutation($input: MealUpdateInput!) {
                mealUpdate(MealUpdateInput: $input)}
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                description: 'description lasagne',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(typeof meal).toEqual('object');
            expect(meal.name).toEqual('couscous');
            expect(meal.description).toEqual('description lasagne');
            expect(meal.price).toEqual(15);
            expect(meal.category).toEqual('cuisine tunisienne');
            expect(meal.image).toEqual('couscous.jpg');
          });
      });
  });

  it('update the image of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        price: 15,
        category: 'cuisine tunisienne',
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: MealUpdateInput!) {
                  mealUpdate(MealUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                image: 'lasagne.jpg',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(typeof meal).toEqual('object');
            expect(meal.name).toEqual('couscous');
            expect(meal.price).toEqual(15);
            expect(meal.category).toEqual('cuisine tunisienne');
            expect(meal.description).toEqual('description couscous');
            expect(meal.image).toEqual('lasagne.jpg');
          });
      });
  });

  it('update the price of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        price: 15,
        category: 'cuisine tunisienne',
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: MealUpdateInput!) {
                  mealUpdate(MealUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                price: 20,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(typeof meal).toEqual('object');
            expect(meal.name).toEqual('couscous');
            expect(meal.price).toEqual(20);
            expect(meal.category).toEqual('cuisine tunisienne');
            expect(meal.description).toEqual('description couscous');
            expect(meal.image).toEqual('couscous.jpg');
          });
      });
  });

  it('update the category of a meal', () => {
    return app
      .get<Model<MealDocument>>(getModelToken(MealSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'couscous',
        description: 'description couscous',
        price: 15,
        category: 'cuisine tunisienne',
        image: 'couscous.jpg',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: MealUpdateInput!) {
                  mealUpdate(MealUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                category: 'cuisine italienne',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealUpdate: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(typeof meal).toEqual('object');
            expect(meal.name).toEqual('couscous');
            expect(meal.price).toEqual(15);
            expect(meal.category).toEqual('cuisine italienne');
            expect(meal.description).toEqual('description couscous');
            expect(meal.image).toEqual('couscous.jpg');
          });
      });
  });
});
