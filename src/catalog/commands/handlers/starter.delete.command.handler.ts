import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as validator from 'class-validator';
import { StarterDeletedEvent } from 'src/catalog/events';
import { StarterRepository } from 'src/catalog/repositories';
import { DessertExceptionDelete } from '../../exceptions/dessert.exception.delete';
import { StarterDeleteCommand } from '../starter.delete.command';

@CommandHandler(StarterDeleteCommand)
export class StarterDeleteCommandHandler
  implements ICommandHandler<StarterDeleteCommand>
{
  constructor(
    private readonly repository: StarterRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: StarterDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new DessertExceptionDelete(errors);
    }

    const starter = await this.repository.findOneByUuid(command.uuid);

    if (!starter) {
      throw new Error('not found');
    }

    return this.repository.delete(starter).then(() => {
      this.eventBus.publish(new StarterDeletedEvent(starter));

      return starter.uuid;
    });
  }
}
