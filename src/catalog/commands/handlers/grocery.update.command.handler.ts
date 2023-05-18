import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as validator from 'class-validator';
import { GroceryUpdatedEvent } from 'src/catalog/events';
import { GroceryRepository } from 'src/catalog/repositories';
import { UuidGenerator } from '../../../common';
import { InvalidArgumentStarterAddCommandException } from '../../exceptions';
import { GroceryUpdateCommand } from '../grocery.update.command';

@CommandHandler(GroceryUpdateCommand)
export class GroceryUpdateCommandHandler
  implements ICommandHandler<GroceryUpdateCommand>
{
  constructor(
    private readonly repository: GroceryRepository,
    private readonly uuidGenerator: UuidGenerator,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: GroceryUpdateCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentStarterAddCommandException(errors);
    }

    const grocery = await this.repository.findOneByUuid(command.uuid);

    grocery.update(command);

    return this.repository.update(grocery).then(() => {
      this.eventBus.publish(new GroceryUpdatedEvent(grocery));

      return grocery.uuid;
    });
  }
}
