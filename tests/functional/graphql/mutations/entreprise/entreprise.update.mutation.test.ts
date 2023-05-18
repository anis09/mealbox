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

describe('[graphql] [mutation] entreprise update', () => {
  let app: INestApplication;
  const uuidExcept = uuid() as string;
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

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

  it('update all fields of a entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [36.84420956163735, 10.201003601641125],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
              mutation($input: EntrepriseUpdateInput!) {
                entrepriseUpdate(EntrepriseUpdateInput: $input)
              }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'test UPDATED',
                email: 'mealboxUPDATED@ati.tn',
                phone: {
                  country: 'TN',
                  number: '+21622221499',
                },
                address: {
                  street: 'Rue Ibn kholdon UPDATED',
                  additional: 'Apt 30 UPDATED',
                  zipCode: 4032,
                  city: 'Sousse UPDATED',
                  country: 'Tunisie UPDATED',
                },
                location: {
                  latitude: 35.81667797578777,
                  longitude: 10.591269912497584,
                },
                activate: false,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('test UPDATED');
            expect(entreprise.location.coordinates).toEqual([
              35.81667797578777, 10.591269912497584,
            ]);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse UPDATED');
            expect(entreprise.address.country).toEqual('Tunisie UPDATED');
            expect(entreprise.address.street).toEqual(
              'Rue Ibn kholdon UPDATED',
            );
            expect(entreprise.address.additional).toEqual('Apt 30 UPDATED');
            expect(entreprise.address.zipCode).toEqual(4032);
            expect(entreprise.phone).toEqual('+21622221499');
            expect(entreprise.email).toEqual('mealboxUPDATED@ati.tn');
          });
      });
  });

  it('update the name of a entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [41, 42],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: EntrepriseUpdateInput!) {
                  entrepriseUpdate(EntrepriseUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                name: 'NoTest',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('NoTest');
            expect(entreprise.location.coordinates[0]).toEqual(41);
            expect(entreprise.location.coordinates[1]).toEqual(42);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse');
            expect(entreprise.address.country).toEqual('Tunisie');
            expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
            expect(entreprise.address.additional).toEqual('Apt 30');
            expect(entreprise.address.zipCode).toEqual(4031);
            expect(entreprise.phone).toEqual('+21671000000');
            expect(entreprise.email).toEqual('mealbox@ati.tn');
          });
      });
  });

  it('update phone of entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [41, 42],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
              mutation($input: EntrepriseUpdateInput!) {
                entrepriseUpdate(EntrepriseUpdateInput: $input)
              }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                phone: {
                  country: 'TN',
                  number: '+21622221499',
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('test');
            expect(entreprise.location.coordinates).toEqual([41, 42]);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse');
            expect(entreprise.address.country).toEqual('Tunisie');
            expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
            expect(entreprise.address.additional).toEqual('Apt 30');
            expect(entreprise.address.zipCode).toEqual(4031);
            expect(entreprise.phone).toEqual('+21622221499');
            expect(entreprise.email).toEqual('mealbox@ati.tn');
          });
      });
  });

  it('update email of entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [41, 42],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
              mutation($input: EntrepriseUpdateInput!) {
                entrepriseUpdate(EntrepriseUpdateInput: $input)
              }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                email: 'mealboxUPDATE@ati.tn',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('test');
            expect(entreprise.location.coordinates).toEqual([41, 42]);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse');
            expect(entreprise.address.country).toEqual('Tunisie');
            expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
            expect(entreprise.address.additional).toEqual('Apt 30');
            expect(entreprise.address.zipCode).toEqual(4031);
            expect(entreprise.phone).toEqual('+21671000000');
            expect(entreprise.email).toEqual('mealboxUPDATE@ati.tn');
          });
      });
  });

  it('update address of entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [41, 42],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
              mutation($input: EntrepriseUpdateInput!) {
                entrepriseUpdate(EntrepriseUpdateInput: $input)
              }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                address: {
                  street: 'Rue Ibn kholdon UPDATED',
                  additional: 'Apt 30 UPDATED',
                  zipCode: 4069,
                  city: 'Sousse UPDATED',
                  country: 'Tunisie UPDATED',
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('test');
            expect(entreprise.location.coordinates).toEqual([41, 42]);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse UPDATED');
            expect(entreprise.address.country).toEqual('Tunisie UPDATED');
            expect(entreprise.address.street).toEqual(
              'Rue Ibn kholdon UPDATED',
            );
            expect(entreprise.address.additional).toEqual('Apt 30 UPDATED');
            expect(entreprise.address.zipCode).toEqual(4069);
            expect(entreprise.phone).toEqual('+21671000000');
            expect(entreprise.email).toEqual('mealbox@ati.tn');
          });
      });
  });

  it('update location of entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'test',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [36.84420956163735, 10.201003601641125],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: EntrepriseUpdateInput!) {
                  entrepriseUpdate(EntrepriseUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                location: {
                  latitude: 35.81667797578777,
                  longitude: 10.591269912497584,
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('test');
            expect(entreprise.location.coordinates).toEqual([
              35.81667797578777, 10.591269912497584,
            ]);
            expect(entreprise.activate).toEqual(false);
            expect(entreprise.address.city).toEqual('Sousse');
            expect(entreprise.address.country).toEqual('Tunisie');
            expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
            expect(entreprise.address.additional).toEqual('Apt 30');
            expect(entreprise.address.zipCode).toEqual(4031);
            expect(entreprise.phone).toEqual('+21671000000');
            expect(entreprise.email).toEqual('mealbox@ati.tn');
          });
      });
  });

  it('update status of an entreprise', () => {
    return app
      .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
      .create({
        uuid: uuidExcept,
        name: 'Status',
        email: 'mealbox@ati.tn',
        phone: '+21671000000',
        address: {
          street: 'Rue Ibn kholdon',
          additional: 'Apt 30',
          zipCode: 4031,
          city: 'Sousse',
          country: 'Tunisie',
        },
        location: {
          coordinates: [36.84420956163735, 10.201003601641125],
        },
        activate: false,
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: EntrepriseUpdateInput!) {
                  entrepriseUpdate(EntrepriseUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
                activate: true,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ entrepriseUpdate: uuidExcept });

        return app
          .get<Model<EntrepriseDocument>>(getModelToken(EntrepriseSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((entreprise) => {
            expect(typeof entreprise).not.toEqual(null);
            expect(entreprise.name).toEqual('Status');
            expect(entreprise.location.coordinates).toEqual([
              36.84420956163735, 10.201003601641125,
            ]);
            expect(entreprise.activate).toEqual(true);
            expect(entreprise.address.city).toEqual('Sousse');
            expect(entreprise.address.country).toEqual('Tunisie');
            expect(entreprise.address.street).toEqual('Rue Ibn kholdon');
            expect(entreprise.address.additional).toEqual('Apt 30');
            expect(entreprise.address.zipCode).toEqual(4031);
            expect(entreprise.phone).toEqual('+21671000000');
            expect(entreprise.email).toEqual('mealbox@ati.tn');
          });
      });
  });
});
