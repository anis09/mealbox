import { MealModel } from '../models';

export class MealUpdatedEvent {
  constructor(public readonly meal: MealModel) {}
}
