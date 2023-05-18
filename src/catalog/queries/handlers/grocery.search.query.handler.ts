import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GroceryRepository } from '../../repositories';
import { GroceryModel } from '../../models';
import { GrocerySearchQuery } from '../grocery.search.query';

@QueryHandler(GrocerySearchQuery)
export class GrocerySearchHandlerQuery
  implements IQueryHandler<GrocerySearchQuery>
{
  constructor(private readonly repository: GroceryRepository) {}

  execute(): Promise<GroceryModel[]> {
    return this.repository.searchAll();
  }
}
