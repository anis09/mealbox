import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { DessertSearchQuery } from 'src/catalog/queries/dessert.search.query';
import {
  DessertAddCommand,
  DessertDeleteCommand,
  DessertUpdateCommand,
} from '../../commands';
import { SearchDessertByArgs } from '../args';
import { DessertAddInput, DessertDeleteInput } from '../inputs';
import { DessertUpdateInput } from '../inputs/dessert.update.input';
import { Dessert } from '../types/dessert';

@Resolver()
export class DessertResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  dessertAdd(@Args(DessertAddInput.name) dessertAddInput: DessertAddInput) {
    return this.commandBus.execute(
      plainToInstance(DessertAddCommand, dessertAddInput),
    );
  }
  @Mutation(() => String)
  dessertUpdate(
    @Args(DessertUpdateInput.name) dessertUpdateInput: DessertUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(DessertUpdateCommand, dessertUpdateInput),
    );
  }

  @Mutation(() => String)
  dessertDelete(
    @Args(DessertDeleteInput.name) dessertDeleteInput: DessertDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(DessertDeleteCommand, dessertDeleteInput),
    );
  }
  @Query(() => [Dessert], { nullable: true })
  dessertSearch(
    @Args() searchDessertByArgs: SearchDessertByArgs,
  ): Promise<Dessert[]> {
    return this.queryBus.execute(
      plainToInstance(DessertSearchQuery, searchDessertByArgs),
    );
  }
}
