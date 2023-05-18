import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KitchenRepository } from '../../repositories';
import { KitchenModel } from '../../models';
import { KitchenSearchQuery } from '../kitchen.search.query';

@QueryHandler(KitchenSearchQuery)
export class KitchenSearchHandlerQuery
  implements IQueryHandler<KitchenSearchQuery>
{
  constructor(private readonly repository: KitchenRepository) {}

  execute(): Promise<KitchenModel[]> {
    return this.repository.searchAll();
  }
}
