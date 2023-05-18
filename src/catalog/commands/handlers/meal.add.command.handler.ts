import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { MealAddCommand } from '../meal.add.command';
import { MealModel } from '../../models';
import { MealRepository } from '../../repositories';
import { MealAddedEvent } from '../../events';
import * as validator from 'class-validator';
import { InvalidArgumentMealAddCommandException } from '../../exceptions';
import { UuidGenerator } from '../../../common';

@CommandHandler(MealAddCommand)
export class MealAddCommandHandler implements ICommandHandler<MealAddCommand> {
  constructor(
    private readonly repository: MealRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: MealAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentMealAddCommandException(errors);
    }

    const meal = new MealModel(this.uuidGenerator.generate());

    meal.add(command);

    return this.repository.store(meal).then(() => {
      this.eventBus.publish(new MealAddedEvent(meal));
      return meal.uuid;
    });
  }
}
