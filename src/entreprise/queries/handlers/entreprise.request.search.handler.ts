import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EntrepriseRequestRepository } from '../../repositories';
import { EntrepriseAddRequestModel } from '../../models';
import { EntrepriseRequestSearchQuery } from '../entreprise.request.search.query';

@QueryHandler(EntrepriseRequestSearchQuery)
export class EntrepriseRequestSearchHandlerQuery
  implements IQueryHandler<EntrepriseRequestSearchQuery>
{
  constructor(private readonly repository: EntrepriseRequestRepository) {}

  execute(): Promise<EntrepriseAddRequestModel[]> {
    return this.repository.searchAll();
  }
}
