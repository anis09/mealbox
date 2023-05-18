import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as validator from 'class-validator';
import { DessertUpdatedEvent } from 'src/catalog/events';
import { DessertRepository } from 'src/catalog/repositories';
import { UuidGenerator } from '../../../common';
import { InvalidArgumentStarterAddCommandException } from '../../exceptions';
import { DessertUpdateCommand } from '../dessert.update.command';

@CommandHandler(DessertUpdateCommand)
export class DessertUpdateCommandHandler
  implements ICommandHandler<DessertUpdateCommand>
{
  constructor(
    private readonly repository: DessertRepository,
    private readonly uuidGenerator: UuidGenerator,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DessertUpdateCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentStarterAddCommandException(errors);
    }

    const dessert = await this.repository.findOneByUuid(command.uuid);

    dessert.update(command);

    return this.repository.update(dessert).then(() => {
      this.eventBus.publish(new DessertUpdatedEvent(dessert));

      return dessert.uuid;
    });
  }
}
