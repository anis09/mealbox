import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { KitchenDeleteCommand } from '../kitchen.delete.command';
import { KitchenRepository } from '../../repositories';
import * as validator from 'class-validator';
import { KitchenDeletedEvent } from '../../events';
import { CustomerExceptionDelete } from '../../../user/exceptions';

@CommandHandler(KitchenDeleteCommand)
export class KitchenDeleteCommandHandler
  implements ICommandHandler<KitchenDeleteCommand>
{
  constructor(
    private readonly repository: KitchenRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: KitchenDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionDelete(errors);
    }

    const kitchen = await this.repository.findOneByUuid(command.uuid);

    if (!kitchen) {
      throw new Error('not found');
    }

    return this.repository.delete(kitchen).then(() => {
      this.eventBus.publish(new KitchenDeletedEvent(kitchen));

      return kitchen.uuid;
    });
  }
}
