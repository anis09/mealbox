import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerUpdateCommand } from '../customer.update.command';
import { CustomerRepository } from '../../repositories';
import * as validator from 'class-validator';
import { CustomerUpdatedEvent } from '../../events';
import { CustomerExceptionUpdate } from '../../exceptions';

@CommandHandler(CustomerUpdateCommand)
export class CustomerUpdateCommandHandler
  implements ICommandHandler<CustomerUpdateCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CustomerUpdateCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionUpdate(errors);
    }

    const customer = await this.repository.findOneByUuid(command.uuid);

    if (!customer) {
      throw new Error('not found');
    }

    customer.update(command);

    return this.repository.update(customer).then(() => {
      this.eventBus.publish(new CustomerUpdatedEvent(customer));

      return customer.uuid;
    });
  }
}
