import { CustomerRepository } from './customer.repository';
import { EmployerRepository } from './employer.repository';

export * from './customer.repository';
export * from './employer.repository';

export const repositories = [CustomerRepository, EmployerRepository];
