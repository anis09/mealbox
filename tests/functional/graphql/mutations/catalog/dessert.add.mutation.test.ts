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
  DessertDocument,
  DessertSchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] dessert add', () => {
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
              mutation($input: DessertAddInput!) {
                dessertAdd(DessertAddInput: $input)
              }
            `),
        ),
        variables: {
          input: {
            name: 'glace',
            description: 'glace gout vanille',
            price: 3,
            category: 'glace',
            image: 'glace.jpg',
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ dessertAdd: uuidExcept });

        return app
          .get<Model<DessertDocument>>(getModelToken(DessertSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((dessert) => {
            expect(dessert).not.toEqual(null);
            expect(dessert.name).toEqual('glace');
            expect(dessert.description).toEqual('glace gout vanille');
            expect(dessert.price).toEqual(3);
            expect(dessert.category).toEqual('glace');
            expect(dessert.image).toEqual('glace.jpg');
          });
      });
  });
});
