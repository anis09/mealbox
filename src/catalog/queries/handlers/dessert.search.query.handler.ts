import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DessertRepository } from '../../repositories';
import { DessertModel } from '../../models';
import { DessertSearchQuery } from '../dessert.search.query';

@QueryHandler(DessertSearchQuery)
export class DessertSearchHandlerQuery
  implements IQueryHandler<DessertSearchQuery>
{
  constructor(private readonly repository: DessertRepository) {}

  execute(): Promise<DessertModel[]> {
    return this.repository.searchAll();
  }
}
