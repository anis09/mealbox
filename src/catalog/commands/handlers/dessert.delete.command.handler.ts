import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DessertDeleteCommand } from '../dessert.delete.command';
import { DessertRepository } from '../../repositories';
import * as validator from 'class-validator';
import { DessertDeletedEvent } from '../../events/dessert.deleted.event';
import { DessertExceptionDelete } from '../../exceptions/dessert.exception.delete';

@CommandHandler(DessertDeleteCommand)
export class DessertDeleteCommandHandler
  implements ICommandHandler<DessertDeleteCommand>
{
  constructor(
    private readonly repository: DessertRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DessertDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new DessertExceptionDelete(errors);
    }

    const dessert = await this.repository.findOneByUuid(command.uuid);

    if (!dessert) {
      throw new Error('not found');
    }

    return this.repository.delete(dessert).then(() => {
      this.eventBus.publish(new DessertDeletedEvent(dessert));

      return dessert.uuid;
    });
  }
}
