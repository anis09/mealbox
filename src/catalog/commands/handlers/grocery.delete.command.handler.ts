import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GroceryRepository } from '../../repositories';
import * as validator from 'class-validator';
import { DessertExceptionDelete } from '../../exceptions/dessert.exception.delete';
import { GroceryDeleteCommand } from '../grocery.delete.command';
import { GroceryDeletedEvent } from 'src/catalog/events';

@CommandHandler(GroceryDeleteCommand)
export class GroceryDeleteCommandHandler
  implements ICommandHandler<GroceryDeleteCommand>
{
  constructor(
    private readonly repository: GroceryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: GroceryDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new DessertExceptionDelete(errors);
    }

    const grocery = await this.repository.findOneByUuid(command.uuid);

    if (!grocery) {
      throw new Error('not found');
    }

    return this.repository.delete(grocery).then(() => {
      this.eventBus.publish(new GroceryDeletedEvent(grocery));

      return grocery.uuid;
    });
  }
}
