import { StarterModel } from '../models';

export class StarterUpdatedEvent {
  constructor(public readonly starter: StarterModel) {}
}
