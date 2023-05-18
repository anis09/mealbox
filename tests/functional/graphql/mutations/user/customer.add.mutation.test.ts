import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { UuidGenerator } from '../../../../../src/common';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import {
  CustomerDocument,
  CustomerSchemaName,
} from '../../../../../src/user/schemas';

describe('[graphql] [mutation] customer add', () => {
  let app: INestApplication;
  const uuidExcept = '222fb4dd-004a-4176-8df1-0178422c1eeb';
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
    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('customer add with all fields', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(
          gql(`
          mutation($input: CustomerAddInput!) {
            customerAdd(CustomerAddInput: $input)
          }
        `),
        ),
        variables: {
          input: {
            firstName: 'anis',
            lastName: 'zaatour',
            email: 'anis@prima-it.consulting',
            password: '123456',
            phone: {
              country: 'TN',
              number: '+21652750397',
            },
          },
        },
      })
      .then(async (response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({ customerAdd: uuidExcept });

        const customer = await app
          .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
          .findOne({ uuid: uuidExcept })
          .exec();

        expect(customer).not.toEqual(null);
        expect(customer.firstName).toEqual('anis');
        expect(customer.lastName).toEqual('zaatour');
        expect(customer.email).toEqual('anis@prima-it.consulting');
        expect(customer.password).toEqual(
          '$argon2i$v=19$m=2730,t=3,p=10$MjIyZmI0ZGQtMDA0YS00MTc2LThkZjEtMDE3ODQyMmMxZWVi$FkZahQJlAsr/ZJkTDDjB46WkwwKVUfVdc1cazTSvN5A',
        );
        expect(customer.phone).toEqual('+21652750397');
      });
  });
});
