import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories';
import { CustomerModel } from '../../models';
import { CustomerSearchQuery } from '../customer.search.query';

@QueryHandler(CustomerSearchQuery)
export class CustomerSearchHandlerQuery
  implements IQueryHandler<CustomerSearchQuery>
{
  constructor(private readonly repository: CustomerRepository) {}

  execute(): Promise<CustomerModel[]> {
    return this.repository.searchAll();
  }
}
