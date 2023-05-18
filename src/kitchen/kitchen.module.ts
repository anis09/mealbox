import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { commandsHandlers } from './commands';
import { resolvers } from './graphql';
import { repositories } from './repositories';
import { schemasDefinitions } from './schemas';
import { CommonModule } from '../common';
import { queryHandlers } from './queries/handlers';

@Module({
  imports: [
    CommonModule,
    CqrsModule,
    MongooseModule.forFeature(schemasDefinitions),
  ],
  providers: [
    ...commandsHandlers,
    ...repositories,
    ...resolvers,
    ...queryHandlers,
  ],
})
export class KitchenModule {}
