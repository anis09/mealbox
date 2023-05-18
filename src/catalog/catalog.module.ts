import { Module } from '@nestjs/common';
import { commandsHandlers } from './commands';
import { queriesHandlers } from './queries';
import { repositories } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { schemasDefinitions } from './schemas';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from '../common';
import { resolvers } from './graphql';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    MongooseModule.forFeature(schemasDefinitions),
  ],
  providers: [
    ...commandsHandlers,
    ...queriesHandlers,
    ...repositories,
    ...resolvers,
  ],
})
export class CatalogModule {}
