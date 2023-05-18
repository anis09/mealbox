import { MealModel } from '../models';

export class MealAddedEvent {
  constructor(public readonly meal: MealModel) {}
}
