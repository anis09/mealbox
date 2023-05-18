import { GroceryModel } from '../models';

export class GroceryDeletedEvent {
  constructor(public readonly customer: GroceryModel) {}
}
