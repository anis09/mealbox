import { MealAddCommandHandler } from './meal.add.command.handler';
import { MealUpdateCommandHandler } from './meal.update.command.handler';
import { DessertAddCommandHandler } from './dessert.add.command.handler';
import { GroceryAddCommandHandler } from './grocery.add.command.handler';
import { StarterAddCommandHandler } from './starter.add.command.handler';
import { StarterUpdateCommandHandler } from './starter.update.command.handler';
import { DessertDeleteCommandHandler } from './dessert.delete.command.handler';
import { DessertUpdateCommandHandler } from './dessert.update.command.handler';
import { GroceryUpdateCommandHandler } from './grocery.update.command.handler';
import { GroceryDeleteCommandHandler } from './grocery.delete.command.handler';
import { MealDeleteCommandHandler } from './meal.delete.command.handler';
import { StarterDeleteCommandHandler } from './starter.delete.command.handler';

export * from './meal.add.command.handler';
export * from './meal.update.command.handler';
export * from './meal.delete.command.handler';
export * from './dessert.add.command.handler';
export * from './grocery.add.command.handler';
export * from './grocery.update.command.handler';
export * from './grocery.delete.command.handler';
export * from './starter.add.command.handler';
export * from './starter.update.command.handler';
export * from './dessert.delete.command.handler';
export * from './dessert.update.command.handler';

export const commandsHandlers = [
  MealAddCommandHandler,
  MealUpdateCommandHandler,
  MealDeleteCommandHandler,
  DessertAddCommandHandler,
  GroceryAddCommandHandler,
  GroceryUpdateCommandHandler,
  StarterAddCommandHandler,
  StarterUpdateCommandHandler,
  StarterDeleteCommandHandler,
  DessertDeleteCommandHandler,
  DessertUpdateCommandHandler,
  GroceryDeleteCommandHandler,
];
