import { EntrepriseRepository } from './entreprise.repository';
import { EntrepriseRequestRepository } from './entreprise.request.repository';

export * from './entreprise.repository';
export * from './entreprise.request.repository';

export const repositories = [EntrepriseRepository, EntrepriseRequestRepository];
