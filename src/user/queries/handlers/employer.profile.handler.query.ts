import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { EmployerProfileQuery } from '../employer.profile.query';
import { EmployerRepository } from '../../repositories';
import { EmployerModel } from '../../models';

@QueryHandler(EmployerProfileQuery)
export class EmployerProfileQueryHandler
  implements IQueryHandler<EmployerProfileQuery>
{
  constructor(private readonly repository: EmployerRepository) {}

  execute(query: EmployerProfileQuery): Promise<EmployerModel> {
    return this.repository.findOneByUuid(query.uuid);
  }
}
