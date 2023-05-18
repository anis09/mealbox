import { EntrepriseModel } from '../models';

export class EntrepriseDeletedEvent {
  constructor(public readonly customer: EntrepriseModel) {}
}
