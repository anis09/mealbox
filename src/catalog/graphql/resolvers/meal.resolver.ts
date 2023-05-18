import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { MealAddInput, MealDeleteInput, MealUpdateInput } from '../inputs';
import { MealAddCommand, MealDeleteCommand } from '../../commands';
import { MealUpdateCommand } from '../../commands';
import { SearchMealByArgs } from '../args';
import { Meal } from '../types/meal';
import { MealSearchQuery } from 'src/catalog/queries/meal.search.query';

@Resolver()
export class MealResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  mealAdd(@Args(MealAddInput.name) mealAddInput: MealAddInput) {
    return this.commandBus.execute(
      plainToInstance(MealAddCommand, mealAddInput),
    );
  }

  @Mutation(() => String)
  mealUpdate(@Args(MealUpdateInput.name) mealUpdateInput: MealUpdateInput) {
    return this.commandBus.execute(
      plainToInstance(MealUpdateCommand, mealUpdateInput),
    );
  }
  @Mutation(() => String)
  mealDelete(@Args(MealDeleteInput.name) mealDeleteInput: MealDeleteInput) {
    return this.commandBus.execute(
      plainToInstance(MealDeleteCommand, mealDeleteInput),
    );
  }
  @Query(() => [Meal], { nullable: true })
  mealSearch(@Args() searchMealByArgs: SearchMealByArgs): Promise<Meal[]> {
    return this.queryBus.execute(
      plainToInstance(MealSearchQuery, searchMealByArgs),
    );
  }
}
