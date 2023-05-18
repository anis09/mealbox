import { EntrepriseSchemaDefinition } from './entreprise.schema';
import { EntrepriseRequestSchemaDefinition } from './entreprise.request.schema';

export * from './entreprise.schema';
export * from './entreprise.request.schema';

export const schemasDefinitions = [
  EntrepriseSchemaDefinition,
  EntrepriseRequestSchemaDefinition,
];
