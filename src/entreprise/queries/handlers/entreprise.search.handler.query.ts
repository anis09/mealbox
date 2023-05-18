import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntrepriseRepository } from '../../repositories';
import { EntrepriseModel } from '../../models';
import { EntrepriseSearchQuery } from '../entreprise.search.query';

@QueryHandler(EntrepriseSearchQuery)
export class EntrepriseSearchHandlerQuery
  implements IQueryHandler<EntrepriseSearchQuery>
{
  constructor(private readonly repository: EntrepriseRepository) {}

  execute(query: EntrepriseSearchQuery): Promise<EntrepriseModel[]> {
    return this.repository.searchByNameAndLocation(
      query.name,
      query.location,
      query.distance,
    );
  }
}
