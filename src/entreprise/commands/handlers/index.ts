import { EntrepriseAddCommandHandler } from './entreprise.add.command.handler';
import { EntrepriseUpdateCommandHandler } from './entreprise.update.command.handler';
import { EntrepriseSendAddRequestCommandHandler } from './entreprise.request.add.command.handler';
import { EntrepriseDeleteCommandHandler } from './entreprise.delete.command.handler';

export * from './entreprise.add.command.handler';
export * from './entreprise.request.add.command.handler';
export * from './entreprise.update.command.handler';
export * from './entreprise.delete.command.handler';

export const commandsHandlers = [
  EntrepriseAddCommandHandler,
  EntrepriseUpdateCommandHandler,
  EntrepriseSendAddRequestCommandHandler,
  EntrepriseDeleteCommandHandler,
];
