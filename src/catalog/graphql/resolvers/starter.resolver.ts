import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  StarterAddInput,
  StarterDeleteInput,
  StarterUpdateInput,
} from '../inputs';
import { StarterAddCommand, StarterDeleteCommand } from '../../commands';
import { StarterUpdateCommand } from '../../commands';
import { Starter } from '../types/starter';
import { SearchStarterByArgs } from '../args';
import { StarterSearchQuery } from 'src/catalog/queries/starter.search.query';

@Resolver()
export class StarterResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  starterAdd(@Args(StarterAddInput.name) starterAddInput: StarterAddInput) {
    return this.commandBus.execute(
      plainToInstance(StarterAddCommand, starterAddInput),
    );
  }

  @Mutation(() => String)
  starterUpdate(
    @Args(StarterUpdateInput.name) starterUpdateInput: StarterUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(StarterUpdateCommand, starterUpdateInput),
    );
  }
  @Mutation(() => String)
  starterDelete(
    @Args(StarterDeleteInput.name) starterDeleteInput: StarterDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(StarterDeleteCommand, starterDeleteInput),
    );
  }
  @Query(() => [Starter], { nullable: true })
  starterSearch(
    @Args() searchStarterByArgs: SearchStarterByArgs,
  ): Promise<Starter[]> {
    return this.queryBus.execute(
      plainToInstance(StarterSearchQuery, searchStarterByArgs),
    );
  }
}
