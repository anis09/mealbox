import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import * as validator from 'class-validator';
import { MealDeletedEvent } from 'src/catalog/events';
import { MealRepository } from 'src/catalog/repositories';
import { DessertExceptionDelete } from '../../exceptions/dessert.exception.delete';
import { MealDeleteCommand } from '../meal.delete.command';

@CommandHandler(MealDeleteCommand)
export class MealDeleteCommandHandler
  implements ICommandHandler<MealDeleteCommand>
{
  constructor(
    private readonly repository: MealRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: MealDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new DessertExceptionDelete(errors);
    }

    const meal = await this.repository.findOneByUuid(command.uuid);

    if (!meal) {
      throw new Error('not found');
    }

    return this.repository.delete(meal).then(() => {
      this.eventBus.publish(new MealDeletedEvent(meal));

      return meal.uuid;
    });
  }
}
