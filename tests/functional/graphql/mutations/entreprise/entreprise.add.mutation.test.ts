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
  EntrepriseDocument,
  EntrepriseSchemaName,
} from '../../../../../src/entreprise/schemas';

describe('[graphql] [mutation] Entreprise add', () => {
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

    return app.init();
  });

  afterEach(async () => {
    if (!app) {
      return;
    }

    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('Entreprise add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: EntrepriseAddInput!) {
            entrepriseAdd(EntrepriseAddInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            name: 'string',
            email: 'mealbox@ati.tn',
            phone: {
              country: 'TN',
              number: '22000000',
            },
            address: {
              street: 'Rue Ibn kholdon',
              additional: 'Apt 30',
              zipCode: 4031,
              city: 'Sousse',
              country: 'Tunisie',
            },
            location: {
              latitude: 42,
              longitude: 39,
            },
            activate: false,
          },
        },
      })
      .then(async (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseAdd: uuidExcept });

        const entreprise = await app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({ uuid: uuidExcept })
          .exec();

        expect(entreprise).not.toEqual(null);
        expect(entreprise.name).toEqual('string');
        expect(entreprise.email).toEqual('mealbox@ati.tn');
        expect(entreprise.phone).toEqual('+21622000000');
        expect(entreprise.location.coordinates).toEqual([42, 39]);
        expect(entreprise.activate).toEqual(false);
        expect(entreprise.address.city).toEqual('Sousse');
        expect(entreprise.address.country).toEqual('Tunisie');
        expect(entreprise.address.additional).toEqual('Apt 30');
        expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
        expect(entreprise.address.zipCode).toEqual(4031);
      });
  });
});
