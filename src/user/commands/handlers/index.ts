import { CustomerAddCommandHandler } from './customer.add.command.handler';
import { CustomerUpdateCommandHandler } from './customer.update.command.handler';
import { CustomerDeleteCommandHandler } from './customer.delete.command.handler';
import { CustomerRegisterCommandHandler } from './customer.register.command.handler';
import { CustomerLoginCommandHandler } from './customer.login.command.handler';
import { CustomerGoogleLoginCommandHandler } from './customer.google.login.command.handler';
import { EmployerLoginCommandHandler } from './employer.login.command.handler';
import { EmployerGoogleLoginCommandHandler } from './employer.google.login.command.handler';

export * from './customer.add.command.handler';
export * from './customer.update.command.handler';
export * from './customer.delete.command.handler';
export * from './customer.register.command.handler';
export * from './customer.login.command.handler';
export * from './customer.google.login.command.handler';
export * from './employer.login.command.handler';
export * from './employer.google.login.command.handler';

export const commandsHandlers = [
  CustomerAddCommandHandler,
  CustomerUpdateCommandHandler,
  CustomerDeleteCommandHandler,
  CustomerRegisterCommandHandler,
  CustomerLoginCommandHandler,
  CustomerGoogleLoginCommandHandler,
  EmployerLoginCommandHandler,
  EmployerGoogleLoginCommandHandler,
];
