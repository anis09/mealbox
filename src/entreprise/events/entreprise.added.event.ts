import { EntrepriseModel } from '../models';

export class EntrepriseAddedEvent {
  constructor(public readonly entreprise: EntrepriseModel) {}
}
