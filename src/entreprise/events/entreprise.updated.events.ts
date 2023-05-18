import { EntrepriseModel } from '../models';

export class EntrepriseUpdatedEvent {
  constructor(public readonly entreprise: EntrepriseModel) {}
}
