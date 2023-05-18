import { DessertModel } from '../models';

export class DessertUpdatedEvent {
  constructor(public readonly starter: DessertModel) {}
}
