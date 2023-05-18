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
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

describe('[graphql] [mutation] customer Googel-login', () => {
  let app: INestApplication;
  const accessTokenExcept = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  const databaseDSN = process.env.DATABASE_DSN;

  beforeEach(async () => {
    const databaseSuffix = Math.random().toString(36).slice(2);
    process.env.DATABASE_DSN = `${databaseDSN}-${databaseSuffix}`;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtService)
      .useValue({
        signAsync: jest.fn().mockResolvedValue(accessTokenExcept),
      })
      .overrideProvider(OAuth2Client)
      .useValue({
        verifyIdToken: jest.fn().mockResolvedValue({
          getPayload: () => ({ email: 'ceif@khedhiri.com' }),
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('login with Google', () => {
    return app
      .get<Model<CustomerDocument>>(getModelToken(CustomerSchemaName))
      .create({
        uuid: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
        firstName: 'ceif',
        lastName: 'khedhiri',
        email: 'ceif@khedhiri.com',
        phone: '+21620000000',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$ODcwZGJkNzktMGQ0ZS00MGY3LWIxMmEtNWNmMDg2ZjE4YzM3$Nwnb6SGCLAKTw6FWz5ag81E84DH+gzdGZvX6JdnprNM',
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                mutation($input: CustomerGoogleLoginInput!) {
                  customerGoogleLogin(CustomerGoogleLoginInput: $input) {
                    accessToken
                  }
                }
              `),
            ),
            variables: {
              input: {
                tokenId: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlYzEzZGViZjRiO',
              },
            },
          });
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          customerGoogleLogin: {
            accessToken: accessTokenExcept,
          },
        });
      });
  });
});
