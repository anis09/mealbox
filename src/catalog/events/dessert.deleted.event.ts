import { DessertModel } from '../models';

export class DessertDeletedEvent {
  constructor(public readonly customer: DessertModel) {}
}
