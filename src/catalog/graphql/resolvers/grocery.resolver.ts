import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  GroceryAddInput,
  GroceryDeleteInput,
  GroceryUpdateInput,
} from '../inputs';
import { GroceryAddCommand, GroceryUpdateCommand } from '../../commands';
import { GroceryDeleteCommand } from 'src/catalog/commands/grocery.delete.command';
import { SearchGroceryByArgs } from '../args';
import { Grocery } from '../types/grocery';
import { GrocerySearchQuery } from 'src/catalog/queries/grocery.search.query';

@Resolver()
export class GroceryResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  groceryAdd(@Args(GroceryAddInput.name) groceryAddInput: GroceryAddInput) {
    return this.commandBus.execute(
      plainToInstance(GroceryAddCommand, groceryAddInput),
    );
  }
  @Mutation(() => String)
  groceryUpdate(
    @Args(GroceryUpdateInput.name) groceryUpdateInput: GroceryUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(GroceryUpdateCommand, groceryUpdateInput),
    );
  }

  @Mutation(() => String)
  groceryDelete(
    @Args(GroceryDeleteInput.name) groceryDeleteInput: GroceryDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(GroceryDeleteCommand, groceryDeleteInput),
    );
  }
  @Query(() => [Grocery], { nullable: true })
  grocerySearch(
    @Args() searchGroceryByArgs: SearchGroceryByArgs,
  ): Promise<Grocery[]> {
    return this.queryBus.execute(
      plainToInstance(GrocerySearchQuery, searchGroceryByArgs),
    );
  }
}
