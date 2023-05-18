import { DessertRepository } from './dessert.repository';
import { MealRepository } from './meal.repository';
import { GroceryRepository } from './grocery.repository';
import { StarterRepository } from './starter.repository';

export * from './meal.repository';
export * from './grocery.repository';
export * from './dessert.repository';
export * from './starter.repository';

export const repositories = [
  MealRepository,
  DessertRepository,
  GroceryRepository,
  StarterRepository,
];
