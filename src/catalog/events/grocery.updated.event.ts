import { GroceryModel } from '../models';

export class GroceryUpdatedEvent {
  constructor(public readonly starter: GroceryModel) {}
}
