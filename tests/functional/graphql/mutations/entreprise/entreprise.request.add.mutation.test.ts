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
  EntrepriseRequestDocument,
  EntrepriseRequestSchemaName,
} from '../../../../../src/entreprise/schemas';

describe('[graphql] [mutation] Entreprise Request add', () => {
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

  it('Request add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: EntrepriseSendAddRequestInput!) {
            entrepriseRequestAdd(EntrepriseSendAddRequestInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            socialReason: 'test',
            address: {
              street: 'Rue Ibn kholdon',
              additional: 'Apt 30',
              zipCode: 4031,
              city: 'Sousse',
              country: 'Tunisie',
            },
            employeeNumber: 'BIG',
            email: 'mealbox@ati.tn',
            phone: {
              country: 'TN',
              number: '22000000',
            },
            requestedBy: {
              firstName: 'Mealbox',
              lastName: 'Ati',
              phone: {
                country: 'TN',
                number: '22000000',
              },
              email: 'mealbox@ati.tn',
              notify: true,
            },
          },
        },
      })
      .then(async (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          entrepriseRequestAdd: uuidExcept,
        });

        const entreprise = await app
          .get<Model<EntrepriseRequestDocument>>(
            getModelToken(EntrepriseRequestSchemaName),
          )
          .findOne({ uuid: uuidExcept })
          .exec();

        expect(entreprise).not.toEqual(null);
        expect(entreprise.email).toEqual('mealbox@ati.tn');
        expect(entreprise.phone).toEqual('+21622000000');
        expect(entreprise.socialReason).toEqual('test');
        expect(entreprise.employeeNumber).toEqual('big');
        expect(entreprise.address.city).toEqual('Sousse');
        expect(entreprise.address.country).toEqual('Tunisie');
        expect(entreprise.address.additional).toEqual('Apt 30');
        expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
        expect(entreprise.address.zipCode).toEqual(4031);
        expect(entreprise.requestedBy.firstName).toEqual('Mealbox');
        expect(entreprise.requestedBy.lastName).toEqual('Ati');
        expect(entreprise.requestedBy.phone).toEqual('+21622000000');
        expect(entreprise.requestedBy.email).toEqual('mealbox@ati.tn');
        expect(entreprise.requestedBy.notify).toEqual(true);
      });
  });
});
