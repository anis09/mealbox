import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerDeleteCommand } from '../customer.delete.command';
import { CustomerRepository } from '../../repositories';
import * as validator from 'class-validator';
import { CustomerDeletedEvent } from '../../events';
import { CustomerExceptionDelete } from '../../exceptions';

@CommandHandler(CustomerDeleteCommand)
export class CustomerDeleteCommandHandler
  implements ICommandHandler<CustomerDeleteCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CustomerDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionDelete(errors);
    }

    const customer = await this.repository.findOneByUuid(command.uuid);

    if (!customer) {
      throw new Error('not found');
    }

    return this.repository.delete(customer).then(() => {
      this.eventBus.publish(new CustomerDeletedEvent(customer));

      return customer.uuid;
    });
  }
}
