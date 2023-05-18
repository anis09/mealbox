import { MealSchemaDefinition } from './meal.schema';
import { DessertSchemaDefinition } from './dessert.schema';
import { GrocerySchemaDefinition } from './grocery.schema';
import { StarterSchemaDefinition } from './starter.schema';
import { DrinkSchemaDefinition } from './drink.schema';

export * from './meal.schema';
export * from './dessert.schema';
export * from './grocery.schema';
export * from './starter.schema';
export * from './drink.schema';

export const schemasDefinitions = [
  MealSchemaDefinition,
  DessertSchemaDefinition,
  GrocerySchemaDefinition,
  StarterSchemaDefinition,
  DrinkSchemaDefinition,
];
