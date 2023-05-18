import { KitchenModel } from '../models';

export class KitchenDeletedEvent {
  constructor(public readonly kitchen: KitchenModel) {}
}
