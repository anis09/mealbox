import { Module } from '@nestjs/common';
import { commandsHandlers } from './commands';
import { repositories } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { schemasDefinitions } from './schemas';
import { resolvers } from './graphql';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from '../common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { OAuth2Client, OAuth2ClientOptions } from 'google-auth-library';
import { queryHandlers } from './queries/handlers';
import { PassportModule } from '@nestjs/passport';
import { strategies } from './strategies';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return config.get<JwtModuleOptions>('jwt');
      },
      inject: [ConfigService],
    }),
    CqrsModule,
    MongooseModule.forFeature(schemasDefinitions),
  ],
  providers: [
    ...commandsHandlers,
    ...repositories,
    ...resolvers,
    ...queryHandlers,
    ...strategies,
    {
      provide: OAuth2Client,
      useFactory: (config: ConfigService) => {
        return new OAuth2Client(
          config.get<OAuth2ClientOptions>('google.oauth'),
        );
      },
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
