import { StarterModel } from '../models';

export class StarterAddedEvent {
  constructor(public readonly starter: StarterModel) {}
}
