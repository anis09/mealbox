import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { MealRepository } from '../../repositories';
import * as validator from 'class-validator';
import { MealUpdateCommand } from '../meal.update.command';
import { InvalidArgumentMealUpdateCommandException } from '../../exceptions';
import { MealUpdatedEvent } from '../../events';

@CommandHandler(MealUpdateCommand)
export class MealUpdateCommandHandler
  implements ICommandHandler<MealUpdateCommand>
{
  constructor(
    private readonly repository: MealRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: MealUpdateCommand): Promise<any> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentMealUpdateCommandException(errors);
    }

    const meal = await this.repository.findOneByUuid(command.uuid);

    meal.update(command);

    return this.repository.update(meal).then(() => {
      this.eventBus.publish(new MealUpdatedEvent(meal));

      return command.uuid;
    });
  }
}
