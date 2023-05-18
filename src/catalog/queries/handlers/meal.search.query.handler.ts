import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MealSearchQuery } from '../meal.search.query';
import { MealRepository } from '../../repositories';
import { MealModel } from 'src/catalog/models';

@QueryHandler(MealSearchQuery)
export class MealSearchQueryHandler implements IQueryHandler<MealSearchQuery> {
  constructor(private readonly repository: MealRepository) {}

  execute(): Promise<MealModel[]> {
    return this.repository.searchAll();
  }
}
