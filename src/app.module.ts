import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigLoader } from '../config';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { ApolloDriver } from '@nestjs/apollo';
import { EntrepriseModule } from './entreprise';
import { KitchenModule } from './kitchen';
import { CatalogModule } from './catalog';
import { UserModule } from './user';
import { ConsoleModule } from 'nestjs-console';
import {
  DriverType,
  StorageModule,
  StorageService,
} from '@codebrew/nestjs-storage';
import { S3Storage } from './common';
import { StorageModuleOptions } from '@codebrew/nestjs-storage/dist/interfaces/storage-module-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvVars: false,
      load: ConfigLoader.load(),
      cache: true,
      envFilePath: ['.env', '.env.dist'],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => {
        return config.get<Omit<GqlModuleOptions, 'driver'>>('graphql');
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://rouis:123*@clicktable.hmb27.mongodb.net/ClickTable?retryWrites=true&w=majority',
    ),
    StorageModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get<StorageModuleOptions>('storage');
      },
      inject: [ConfigService],
    }),
    ConsoleModule,
    KitchenModule,
    CatalogModule,
    EntrepriseModule,
    UserModule,
  ],
})
export class AppModule {
  constructor(private readonly storage: StorageService) {
    this.storage.registerDriver(DriverType.S3, S3Storage);
  }
}
