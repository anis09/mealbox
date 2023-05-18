import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerAddCommand } from '../customer.add.command';
import { CustomerModel } from '../../models';
import { CustomerRepository } from '../../repositories';
import { CustomerAddedEvent } from '../../events';
import * as validator from 'class-validator';
import { CustomerExceptionAdd } from '../../exceptions';
import { UuidGenerator } from '../../../common';

@CommandHandler(CustomerAddCommand)
export class CustomerAddCommandHandler
  implements ICommandHandler<CustomerAddCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: CustomerAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionAdd(errors);
    }

    const customer = new CustomerModel(this.uuidGenerator.generate());
    customer.add(command);

    return this.repository.store(customer).then(() => {
      this.eventBus.publish(new CustomerAddedEvent(customer));

      return customer.uuid;
    });
  }
}
