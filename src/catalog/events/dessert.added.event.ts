import { DessertModel } from '../models';

export class DessertAddedEvent {
  constructor(public readonly dessert: DessertModel) {}
}
