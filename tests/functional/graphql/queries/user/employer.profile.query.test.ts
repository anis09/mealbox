import { Test, TestingModule } from '@nestjs/testing';
import { Catch, ExceptionFilter, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../../src/app.module';
import { gql } from 'apollo-server-express';
import { print } from 'graphql';
import { Connection, Model } from 'mongoose';
import { getModelToken, getConnectionToken } from '@nestjs/mongoose';
import {
  EmployerDocument,
  EmployerSchemaName,
} from '../../../../../src/user/schemas';
import { JwtService } from '@nestjs/jwt';

@Catch()
class NoCatchAllExceptionsFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  catch(): any {}
}

describe('[graphql] [query] employer profile', () => {
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
    if (!app) {
      return;
    }

    await app.get<Connection>(getConnectionToken()).dropDatabase();
    await app.close();
  });

  it('get profile', () => {
    return app
      .get<Model<EmployerDocument>>(getModelToken(EmployerSchemaName))
      .create({
        uuid: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
        firstName: 'claude',
        lastName: 'khedhiri',
        email: 'claude@prima-it.consulting',
        password:
          '$argon2i$v=19$m=2730,t=3,p=10$ODcwZGJkNzktMGQ0ZS00MGY3LWIxMmEtNWNmMDg2ZjE4YzM3$Nwnb6SGCLAKTw6FWz5ag81E84DH+gzdGZvX6JdnprNM',
      })
      .then(() => {
        const token = app.get(JwtService).sign({
          sub: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
          uuid: '870dbd79-0d4e-40f7-b12a-5cf086f18c37',
          email: 'claude@prima-it.consulting',
          firstName: 'claude',
          lastName: 'khedhiri',
        });

        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: print(
              gql(`
                query {
                  employerProfile {
                    firstName
                    lastName
                    email
                    fullName
                  }
                }
              `),
            ),
          })
          .set('Authorization', `Bearer ${token}`);
      })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual({
          employerProfile: {
            firstName: 'claude',
            lastName: 'khedhiri',
            email: 'claude@prima-it.consulting',
            fullName: 'claude khedhiri',
          },
        });
      });
  });
});
