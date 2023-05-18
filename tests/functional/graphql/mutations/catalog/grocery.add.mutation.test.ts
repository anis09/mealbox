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
  GroceryDocument,
  GrocerySchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] grocery add', () => {
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

  it('grocery add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: GroceryAddInput!) {
            groceryAdd(GroceryAddInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            name: 'cake',
            description: 'chocolat',
            price: 5,
            category: 'Sweet',
            image: 'cake.jpg',
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ groceryAdd: uuidExcept });

        return app
          .get<Model<GroceryDocument>>(getModelToken(GrocerySchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((grocery) => {
            expect(grocery).not.toEqual(null);
            expect(grocery.name).toEqual('cake');
            expect(grocery.description).toEqual('chocolat');
            expect(grocery.price).toEqual(5);
            expect(grocery.category).toEqual('Sweet');
            expect(grocery.image).toEqual('cake.jpg');
          });
      });
  });
});
