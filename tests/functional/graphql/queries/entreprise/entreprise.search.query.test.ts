import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { Connection, Model } from 'mongoose';
import {
  EntrepriseDocument,
  EntrepriseSchemaName,
} from '../../../../../src/entreprise/schemas';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { UuidGenerator } from '../../../../../src/common';
import { v4 as uuid } from 'uuid';

describe('[graphql] [query] ping', () => {
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

    await app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .insertMany([
        {
          uuid: 'af14c94d-4fe5-4929-869e-a1f2a5f3652d',
          name: 'Orange Tunisie',
          phone: '+21630013001',
          email: 'contact@orange.tn',
          activate: true,
          address: {
            street: 'Immeuble Orange Tunisie',
            city: 'Tunis',
            zipCode: '1003',
            country: 'Tunisie',
          },
          location: {
            coordinates: [36.84420956163735, 10.201003601641125],
          },
        },
        {
          uuid: 'b142e51e-8863-44a0-ac3a-86c3f5ba2bc1',
          name: 'Zara',
          phone: '+21670258200',
          email: 'contact@zara.com',
          activate: true,
          address: {
            street: '72 Rue des Minéraux',
            additional: 'La Charguia 1',
            city: 'Tunis',
            zipCode: '2035',
            country: 'Tunisie',
          },
          location: {
            coordinates: [36.83501978703411, 10.210235331491987],
          },
        },
        {
          uuid: 'bf66ef43-fc7b-46ac-bf94-be8ff6203b8e',
          name: 'Valtech it',
          phone: '+21671766547',
          email: 'contact@valtech-it.com',
          activate: false,
          address: {
            street: 'Rue Ammar Ibn Yasser',
            additional: 'Bureau n°1',
            city: 'Ariana',
            zipCode: '2091',
            country: 'Tunisie',
          },
          location: {
            coordinates: [36.84846671780907, 10.165585190710788],
          },
        },
        {
          uuid: '29c58a07-4f49-43ed-8927-99f4bd9d5f4e',
          name: 'Proxym',
          phone: '+21636015050',
          email: 'contact@proxym-group.com',
          activate: true,
          address: {
            street: 'Technopole de Sousse',
            additional: 'Novation City',
            zipCode: '4051',
            city: 'Sousse',
            country: 'Tunisie',
          },
          location: {
            coordinates: [35.81667797578777, 10.591269912497584],
          },
        },
      ])
      .then(() => new Promise((resolve) => setTimeout(resolve, 8000)));
  }, 15000);

  afterEach(async () => {
    if (!app) {
      return;
    }

    await app
      .get<Connection>(getConnectionToken())
      .dropDatabase()
      .catch(() => {
        return undefined;
      });

    return app.close();
  });

  it('search entreprise by location and name', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
            query($name: String, $location: SearchEntrepriseByLocationArgs) {
              entrepriseSearch(
                name: $name,
                location: $location
              ) {
                name
                address {
                  street
                  additional
                  zipCode
                  city
                  country
                }
                location {
                  latitude
                  longitude
                }
              }
            }
        `),
        ),
        variables: {
          name: 'orange',
          location: {
            latitude: 36.83335572648753,
            longitude: 10.155726658364129,
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          entrepriseSearch: [
            {
              name: 'Orange Tunisie',
              address: {
                street: 'Immeuble Orange Tunisie',
                additional: null,
                zipCode: 1003,
                city: 'Tunis',
                country: 'Tunisie',
              },
              location: {
                latitude: 36.84420956163735,
                longitude: 10.201003601641125,
              },
            },
          ],
        });
      });
  });

  it('search entreprise by name', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
            query($name: String) {
              entrepriseSearch(
                name: $name
              ) {
                name
                address {
                  street
                  additional
                  zipCode
                  city
                  country
                }
                location {
                  latitude
                  longitude
                }
              }
            }
        `),
        ),
        variables: {
          name: 'zara',
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          entrepriseSearch: [
            {
              name: 'Zara',
              address: {
                street: '72 Rue des Minéraux',
                additional: 'La Charguia 1',
                zipCode: 2035,
                city: 'Tunis',
                country: 'Tunisie',
              },
              location: {
                latitude: 36.83501978703411,
                longitude: 10.210235331491987,
              },
            },
          ],
        });
      });
  });

  it('search entreprise by location', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
            query($location: SearchEntrepriseByLocationArgs) {
              entrepriseSearch(
                location: $location
              ) {
                name
                address {
                  street
                  additional
                  zipCode
                  city
                  country
                }
                location {
                  latitude
                  longitude
                }
              }
            }
        `),
        ),
        variables: {
          location: {
            latitude: 36.83335572648753,
            longitude: 10.155726658364129,
          },
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('entrepriseSearch');
        expect(response.body.data.entrepriseSearch).toEqual(
          expect.arrayContaining([
            {
              name: 'Orange Tunisie',
              address: {
                street: 'Immeuble Orange Tunisie',
                additional: null,
                zipCode: 1003,
                city: 'Tunis',
                country: 'Tunisie',
              },
              location: {
                latitude: 36.84420956163735,
                longitude: 10.201003601641125,
              },
            },
            {
              name: 'Zara',
              address: {
                street: '72 Rue des Minéraux',
                additional: 'La Charguia 1',
                zipCode: 2035,
                city: 'Tunis',
                country: 'Tunisie',
              },
              location: {
                latitude: 36.83501978703411,
                longitude: 10.210235331491987,
              },
            },
          ]),
        );
      });
  });
});
