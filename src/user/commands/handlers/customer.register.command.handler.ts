import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerModel } from '../../models';
import { CustomerRepository } from '../../repositories';
import * as validator from 'class-validator';
import { UuidGenerator } from '../../../common';
import { CustomerRegisteredEvent } from '../../events';
import { CustomerRegisterCommand } from '../customer.register.command';
import { CustomerExceptionRegister } from '../../exceptions';

@CommandHandler(CustomerRegisterCommand)
export class CustomerRegisterCommandHandler
  implements ICommandHandler<CustomerRegisterCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: CustomerRegisterCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionRegister(errors);
    }

    const customer = new CustomerModel(this.uuidGenerator.generate());

    customer.register(command);

    return this.repository.store(customer).then(() => {
      this.eventBus.publish(new CustomerRegisteredEvent(customer));

      return customer.uuid;
    });
  }
}
