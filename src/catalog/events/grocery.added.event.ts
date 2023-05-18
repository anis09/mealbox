import { GroceryModel } from '../models';

export class GroceryAddedEvent {
  constructor(public readonly grocery: GroceryModel) {}
}
