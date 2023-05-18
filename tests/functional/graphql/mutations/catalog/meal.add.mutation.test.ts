import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { UuidGenerator } from '../../../../../src/common';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import {
  MealDocument,
  MealSchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] meal add', () => {
  let app: INestApplication;
  let uuidExcept: string;
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    uuidExcept = uuid();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UuidGenerator)
      .useValue({ generate: jest.fn().mockReturnValue(uuidExcept) })
      .compile();

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

  it('meal add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: MealAddInput!) {
            mealAdd(MealAddInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            name: 'couscous',
            description: 'description couscous',
            price: 15,
            category: 'cuisine tunisienne',
            image: 'couscous.jpg',
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ mealAdd: uuidExcept });

        return app
          .get<Model<MealDocument>>(getModelToken(MealSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((meal) => {
            expect(meal).not.toEqual(null);
            expect(meal.name).toEqual('couscous');
            expect(meal.description).toEqual('description couscous');
            expect(meal.price).toEqual(15);
            expect(meal.category).toEqual('cuisine tunisienne');
            expect(meal.image).toEqual('couscous.jpg');
          });
      });
  });
});
