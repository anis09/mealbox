import { MealModel } from '../models';

export class MealDeletedEvent {
  constructor(public readonly customer: MealModel) {}
}
