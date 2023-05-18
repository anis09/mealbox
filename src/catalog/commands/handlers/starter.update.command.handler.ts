import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as validator from 'class-validator';
import { UuidGenerator } from '../../../common';
import { InvalidArgumentStarterAddCommandException } from '../../exceptions';
import { StarterRepository } from '../../repositories';
import { StarterUpdatedEvent } from '../../events';
import { StarterUpdateCommand } from '../starter.update.command';

@CommandHandler(StarterUpdateCommand)
export class StarterUpdateCommandHandler
  implements ICommandHandler<StarterUpdateCommand>
{
  constructor(
    private readonly repository: StarterRepository,
    private readonly uuidGenerator: UuidGenerator,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: StarterUpdateCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentStarterAddCommandException(errors);
    }

    const starter = await this.repository.findOneByUuid(command.uuid);

    starter.update(command);

    return this.repository.update(starter).then(() => {
      this.eventBus.publish(new StarterUpdatedEvent(starter));

      return starter.uuid;
    });
  }
}
