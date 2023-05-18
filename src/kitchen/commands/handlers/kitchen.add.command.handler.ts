import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { KitchenAddedEvent } from '../../events';
import { KitchenModel } from '../../models';
import { KitchenRepository } from '../../repositories';
import { KitchenAddCommand } from '../kitchen.add.command';
import { UuidGenerator } from '../../../common';
import * as validator from 'class-validator';
import { InvalidArgumentKitchenAddCommandException } from '../../exceptions';

@CommandHandler(KitchenAddCommand)
export class KitchenAddCommandHandler
  implements ICommandHandler<KitchenAddCommand>
{
  constructor(
    private readonly repository: KitchenRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  execute(command: KitchenAddCommand): Promise<any> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentKitchenAddCommandException(errors);
    }

    const kitchen = new KitchenModel(this.uuidGenerator.generate());
    kitchen.add(command);

    return this.repository.store(kitchen).then(() => {
      this.eventBus.publish(new KitchenAddedEvent(kitchen));

      return kitchen.uuid;
    });
  }
}
