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
  CustomerDocument,
  CustomerSchemaName,
} from '../../../../../src/user/schemas';

describe('[graphql] [mutation] customer delete', () => {
  let app: INestApplication;
  const uuidExcept = uuid() as string;
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

  it('delete all fields of a customer', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: uuidExcept,
        firstName: 'anis',
        lastName: 'zaatour',
        email: 'anis@prima-it.consulting',
        password: '123456',
        phone: '+21652750397',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerDeleteInput!) {
                  customerDelete(CustomerDeleteInput: $input)
                }
              `),
            ),
            variables: {
              input: {
                uuid: uuidExcept,
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerDelete: uuidExcept,
        });

        return app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({
            uuid: uuidExcept,
          })
          .exec()
          .then((customer) => {
            expect(customer).toEqual(null);
          });
      });
  });
});
