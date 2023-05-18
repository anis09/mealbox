import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GroceryAddCommand } from '../grocery.add.command';
import { GroceryModel } from '../../models';
import { GroceryRepository } from '../../repositories';
import { GroceryAddedEvent } from '../../events';
import * as validator from 'class-validator';
import { InvalidArgumentGroceryAddCommandException } from '../../exceptions';
import { UuidGenerator } from '../../../common';

@CommandHandler(GroceryAddCommand)
export class GroceryAddCommandHandler
  implements ICommandHandler<GroceryAddCommand>
{
  constructor(
    private readonly repository: GroceryRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: GroceryAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentGroceryAddCommandException(errors);
    }

    const grocery = new GroceryModel(this.uuidGenerator.generate());

    grocery.add(command);

    return this.repository.store(grocery).then(() => {
      this.eventBus.publish(new GroceryAddedEvent(grocery));
      return grocery.uuid;
    });
  }
}
