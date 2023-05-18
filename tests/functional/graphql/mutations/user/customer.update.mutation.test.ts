import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import {
  CustomerDocument,
  CustomerSchemaName,
} from '../../../../../src/user/schemas';

describe('[graphql] [mutation] customer update', () => {
  let app: INestApplication;
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app
      .get<Connection>(getConnectionToken())
      .dropDatabase()
      .catch(() => {
        return undefined;
      });

    await app.close();
  });

  it('update all fields of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: '361fc5bd-8145-4122-8598-1210b0ea3114',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$MzYxZmM1YmQtODE0NS00MTIyLTg1OTgtMTIxMGIwZWEzMTE0$mchB4MJXLpZdD8ObiLdgD0WhoBRDM60IJRFGGc+WXUw',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: '361fc5bd-8145-4122-8598-1210b0ea3114',
                firstName: 'fedi',
                lastName: 'bouzayen',
                email: 'fedi@prima-it.consulting',
                password: '123456789',
                phone: {
                  country: 'TN',
                  number: '+21655221064',
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: '361fc5bd-8145-4122-8598-1210b0ea3114',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: '361fc5bd-8145-4122-8598-1210b0ea3114',
          })
          .exec()
          .then((customer) => {
            expect(customer).not.toEqual(null);
            expect(customer.firstName).toEqual('fedi');
            expect(customer.lastName).toEqual('bouzayen');
            expect(customer.email).toEqual('fedi@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$MzYxZmM1YmQtODE0NS00MTIyLTg1OTgtMTIxMGIwZWEzMTE0$j0OvW6gr9gs2BH17NfoLzsa58+EwRUjlKCokSFUzkkk',
            );
            expect(customer.phone).toEqual('+21655221064');
          });
      });
  });

  it('update the firstName of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: '16f8a319-a292-4d79-9024-2e1ef2f1020e',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$MTZmOGEzMTktYTI5Mi00ZDc5LTkwMjQtMmUxZWYyZjEwMjBl$fn2lg//e0r5kPvRsv2Y1JjvcpXmp/E+DmTJjdlFzxhE',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: '16f8a319-a292-4d79-9024-2e1ef2f1020e',
                firstName: 'ceif',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: '16f8a319-a292-4d79-9024-2e1ef2f1020e',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: '16f8a319-a292-4d79-9024-2e1ef2f1020e',
          })
          .exec()
          .then((customer) => {
            expect(customer).not.toEqual(null);
            expect(customer.firstName).toEqual('ceif');
            expect(customer.lastName).toEqual('zaatour');
            expect(customer.email).toEqual('anis@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$MTZmOGEzMTktYTI5Mi00ZDc5LTkwMjQtMmUxZWYyZjEwMjBl$fn2lg//e0r5kPvRsv2Y1JjvcpXmp/E+DmTJjdlFzxhE',
            );
            expect(customer.phone).toEqual('+21652750397');
          });
      });
  });

  it('update the lastName of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: 'fbe0aa28-17e0-4fef-af3a-3aa01a43ab43',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$ZmJlMGFhMjgtMTdlMC00ZmVmLWFmM2EtM2FhMDFhNDNhYjQz$kKkR5GZN5PPyLHIUqnEcCowtFJfk48A72FXKrVXTQ7o',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: 'fbe0aa28-17e0-4fef-af3a-3aa01a43ab43',
                lastName: 'rouiss',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: 'fbe0aa28-17e0-4fef-af3a-3aa01a43ab43',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: 'fbe0aa28-17e0-4fef-af3a-3aa01a43ab43',
          })
          .exec()
          .then((customer) => {
            expect(customer).not.toEqual(null);
            expect(customer.firstName).toEqual('anis');
            expect(customer.lastName).toEqual('rouiss');
            expect(customer.email).toEqual('anis@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$ZmJlMGFhMjgtMTdlMC00ZmVmLWFmM2EtM2FhMDFhNDNhYjQz$kKkR5GZN5PPyLHIUqnEcCowtFJfk48A72FXKrVXTQ7o',
            );
            expect(customer.phone).toEqual('+21652750397');
          });
      });
  });

  it('update the email of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: 'df444ba1-552a-45ec-8a07-6ad3339c30d7',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$ZGY0NDRiYTEtNTUyYS00NWVjLThhMDctNmFkMzMzOWMzMGQ3$4vhuTh/CR5glAiRPq/kVhX8IwlsL7NrFhrTcvogHQcQ',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: 'df444ba1-552a-45ec-8a07-6ad3339c30d7',
                email: 'jihed@prima-it.consulting',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: 'df444ba1-552a-45ec-8a07-6ad3339c30d7',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: 'df444ba1-552a-45ec-8a07-6ad3339c30d7',
          })
          .exec()
          .then((customer) => {
            expect(typeof customer).toEqual('object');
            expect(customer.firstName).toEqual('anis');
            expect(customer.lastName).toEqual('zaatour');
            expect(customer.email).toEqual('jihed@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$ZGY0NDRiYTEtNTUyYS00NWVjLThhMDctNmFkMzMzOWMzMGQ3$4vhuTh/CR5glAiRPq/kVhX8IwlsL7NrFhrTcvogHQcQ',
            );
            expect(customer.phone).toEqual('+21652750397');
          });
      });
  });
  it('update the password of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: '6a459ec4-8d77-4305-9c7a-fb9669bbd605',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$NmE0NTllYzQtOGQ3Ny00MzA1LTljN2EtZmI5NjY5YmJkNjA1$bjCM9JD0Q+4IaODJ3ORDCHi+E6tJmKlJmXC3PAKU54U',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: '6a459ec4-8d77-4305-9c7a-fb9669bbd605',
                password: '11223344',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: '6a459ec4-8d77-4305-9c7a-fb9669bbd605',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: '6a459ec4-8d77-4305-9c7a-fb9669bbd605',
          })
          .exec()
          .then((customer) => {
            expect(customer).not.toEqual(null);
            expect(customer.firstName).toEqual('anis');
            expect(customer.lastName).toEqual('zaatour');
            expect(customer.email).toEqual('anis@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$NmE0NTllYzQtOGQ3Ny00MzA1LTljN2EtZmI5NjY5YmJkNjA1$0TWAQlaCKErbXSak2HYzBi9WyNVYPH3xOysF6Uts9yw',
            );
            expect(customer.phone).toEqual('+21652750397');
          });
      });
  });
  it('update the phone of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: 'e68a37c0-719e-43c3-8d5c-c9f0b8a2d567',
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$ZTY4YTM3YzAtNzE5ZS00M2MzLThkNWMtYzlmMGI4YTJkNTY3$0hGqN9bwWqyoyFQQgtM32l39CmSzBLsrVRZHNfJYkmk',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerUpdateInput!) {
                  customerUpdate(CustomerUpdateInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: 'e68a37c0-719e-43c3-8d5c-c9f0b8a2d567',
                phone: {
                  country: 'TN',
                  number: '+21698212944',
                },
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerUpdate: 'e68a37c0-719e-43c3-8d5c-c9f0b8a2d567',
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: 'e68a37c0-719e-43c3-8d5c-c9f0b8a2d567',
          })
          .exec()
          .then((customer) => {
            expect(customer).not.toEqual(null);
            expect(customer.firstName).toEqual('anis');
            expect(customer.lastName).toEqual('zaatour');
            expect(customer.email).toEqual('anis@prima-it.consulting');
            expect(customer.password).toEqual(
              '$argon2i$v=19$m=2730,t=3,p=10$ZTY4YTM3YzAtNzE5ZS00M2MzLThkNWMtYzlmMGI4YTJkNTY3$0hGqN9bwWqyoyFQQgtM32l39CmSzBLsrVRZHNfJYkmk',
            );
            expect(customer.phone).toEqual('+21698212944');
          });
      });
  });
});
