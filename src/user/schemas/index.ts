import { CustomerSchemaDefinition } from './customer.schema';
import { EmployerSchemaDefinition } from './employer.schema';

export * from './customer.schema';
export * from './employer.schema';

export const schemasDefinitions = [
  CustomerSchemaDefinition,
  EmployerSchemaDefinition,
];
