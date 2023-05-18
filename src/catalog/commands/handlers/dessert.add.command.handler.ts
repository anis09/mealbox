import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InvalidArgumentDessertAddCommandException } from '../../exceptions';
import { DessertRepository } from '../../repositories';
import { UuidGenerator } from '../../../common';
import { DessertAddCommand } from '../dessert.add.command';
import * as validator from 'class-validator';
import { DessertModel } from '../../models/dessert.model';
import { DessertAddedEvent } from '../../events/dessert.added.event';

@CommandHandler(DessertAddCommand)
export class DessertAddCommandHandler
  implements ICommandHandler<DessertAddCommand>
{
  constructor(
    private readonly repository: DessertRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: DessertAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentDessertAddCommandException(errors);
    }

    const dessert = new DessertModel(this.uuidGenerator.generate());

    dessert.add(command);

    return this.repository.store(dessert).then(() => {
      this.eventBus.publish(new DessertAddedEvent(dessert));

      return dessert.uuid;
    });
  }
}
