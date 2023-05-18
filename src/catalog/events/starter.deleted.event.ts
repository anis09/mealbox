import { StarterModel } from '../models';

export class StarterDeletedEvent {
  constructor(public readonly customer: StarterModel) {}
}
