import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StarterModel } from '../../models';
import * as validator from 'class-validator';
import { UuidGenerator } from '../../../common';
import { StarterAddCommand } from '../starter.add.command';
import { InvalidArgumentStarterAddCommandException } from '../../exceptions';
import { StarterRepository } from '../../repositories';
import { StarterAddedEvent } from '../../events';

@CommandHandler(StarterAddCommand)
export class StarterAddCommandHandler
  implements ICommandHandler<StarterAddCommand>
{
  constructor(
    private readonly repository: StarterRepository,
    private readonly uuidGenerator: UuidGenerator,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: StarterAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentStarterAddCommandException(errors);
    }

    const starter = new StarterModel(this.uuidGenerator.generate());

    starter.add(command);

    return this.repository.store(starter).then(() => {
      this.eventBus.publish(new StarterAddedEvent(starter));

      return starter.uuid;
    });
  }
}
