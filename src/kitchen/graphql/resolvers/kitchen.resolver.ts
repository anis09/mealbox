import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { KitchenDeleteCommand } from 'src/kitchen/commands/kitchen.delete.command';
import { KitchenSearchQuery } from 'src/kitchen/queries/kitchen.search.query';
import { KitchenAddCommand, KitchenUpdateCommand } from '../../commands';
import { SearchKitchenByArgs } from '../args/kitchen.search.args';
import {
  KitchenAddInput,
  KitchenDeleteInput,
  KitchenUpdateInput,
} from '../inputs';
import { Kitchen } from '../types/kitchen';

@Resolver()
export class KitchenResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  kitchenAdd(@Args(KitchenAddInput.name) kitchenAddInput: KitchenAddInput) {
    return this.commandBus.execute(
      plainToInstance(KitchenAddCommand, kitchenAddInput),
    );
  }

  @Mutation(() => String)
  kitchenUpdate(
    @Args(KitchenUpdateInput.name) kitchenUpdateInput: KitchenUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(KitchenUpdateCommand, kitchenUpdateInput),
    );
  }
  @Mutation(() => String)
  kitchenDelete(
    @Args(KitchenDeleteInput.name) kitchenDeleteInput: KitchenDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(KitchenDeleteCommand, kitchenDeleteInput),
    );
  }
  @Query(() => [Kitchen], { nullable: true })
  kitchenSearch(
    @Args() searchKitchenByArgs: SearchKitchenByArgs,
  ): Promise<Kitchen[]> {
    return this.queryBus.execute(
      plainToInstance(KitchenSearchQuery, searchKitchenByArgs),
    );
  }
}
