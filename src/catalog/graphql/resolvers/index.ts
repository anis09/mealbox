import { DessertResolver } from './dessert.resolver';
import { MealResolver } from './meal.resolver';
import { GroceryResolver } from './grocery.resolver';
import { StarterResolver } from './starter.resolver';

export const resolvers = [
  MealResolver,
  DessertResolver,
  GroceryResolver,
  StarterResolver,
];
