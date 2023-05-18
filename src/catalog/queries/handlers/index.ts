import { MealSearchQueryHandler } from './meal.search.query.handler';
import { DessertSearchHandlerQuery } from './dessert.search.query.handler';
import { GrocerySearchHandlerQuery } from './grocery.search.query.handler';
import { StarterSearchQueryHandler } from './starter.search.query.handler';

export const queriesHandlers = [
  MealSearchQueryHandler,
  DessertSearchHandlerQuery,
  GrocerySearchHandlerQuery,
  StarterSearchQueryHandler,
];
