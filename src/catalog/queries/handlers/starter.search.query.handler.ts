import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StarterSearchQuery } from '../starter.search.query';
import { StarterRepository } from '../../repositories';
import { StarterModel } from 'src/catalog/models';

@QueryHandler(StarterSearchQuery)
export class StarterSearchQueryHandler
  implements IQueryHandler<StarterSearchQuery>
{
  constructor(private readonly repository: StarterRepository) {}

  execute(): Promise<StarterModel[]> {
    return this.repository.searchAll();
  }
}
