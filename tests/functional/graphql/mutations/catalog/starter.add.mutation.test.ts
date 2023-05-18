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
  StarterDocument,
  StarterSchemaName,
} from '../../../../../src/catalog/schemas';

describe('[graphql] [mutation] starter add', () => {
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

  it('add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
              mutation($input: StarterAddInput!) {
                starterAdd(StarterAddInput: $input)
              }
            `),
        ),
        variables: {
          input: {
            name: 'Tomates confites',
            category: 'Nos entrées',
            description:
              "Des tomates séchées dans un peu d'huile, du sel, de l'ail, de basilic et de l'origan c'est absolument ce qu'il vous faut pour grignoter avant d'attaquer le déjeuner !",
            image: 'medias/starters/tomates_confites.jpg',
            price: 3000,
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ starterAdd: uuidExcept });

        return app
          .get<Model<StarterDocument>>(getModelToken(StarterSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((starter) => {
            expect(starter).not.toEqual(null);
            expect(starter.name).toEqual('Tomates confites');
            expect(starter.category).toEqual('Nos entrées');
            expect(starter.description).toEqual(
              "Des tomates séchées dans un peu d'huile, du sel, de l'ail, de basilic et de l'origan c'est absolument ce qu'il vous faut pour grignoter avant d'attaquer le déjeuner !",
            );
            expect(starter.image).toEqual(
              'medias/starters/tomates_confites.jpg',
            );
            expect(starter.price).toEqual(3000);
          });
      });
  });
});
