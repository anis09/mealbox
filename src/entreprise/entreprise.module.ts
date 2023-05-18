import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { repositories } from './repositories';
import { schemasDefinitions } from './schemas';
import { commandsHandlers } from './commands';
import { resolvers } from './graphql';
import { CommonModule } from '../common';
import { queryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    CommonModule,
    MongooseModule.forFeature(schemasDefinitions),
  ],
  providers: [
    ...commandsHandlers,
    ...queryHandlers,
    ...repositories,
    ...resolvers,
  ],
})
export class EntrepriseModule {}
