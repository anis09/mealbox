import { KitchenAddCommandHandler } from './kitchen.add.command.handler';
import { KitchenUpdateCommandHandler } from './kitchen.update.command.handler';
import { KitchenDeleteCommandHandler } from './kitchen.delete.command.handler';

export * from './kitchen.add.command.handler';
export * from './kitchen.update.command.handler';
export * from './kitchen.delete.command.handler';

export const commandsHandlers = [
  KitchenAddCommandHandler,
  KitchenUpdateCommandHandler,
  KitchenDeleteCommandHandler,
];
