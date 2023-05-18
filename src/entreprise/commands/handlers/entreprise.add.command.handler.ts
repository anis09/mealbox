import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntrepriseAddCommand } from '../entreprise.add.command';
import { EntrepriseModel } from '../../models';
import { EntrepriseRepository } from '../../repositories';
import { EntrepriseAddedEvent } from '../../events';
import * as validator from 'class-validator';
import { InvalidArgumentEntrepriseAddCommandException } from '../../exceptions';
import { UuidGenerator } from '../../../common';

@CommandHandler(EntrepriseAddCommand)
export class EntrepriseAddCommandHandler
  implements ICommandHandler<EntrepriseAddCommand>
{
  constructor(
    private readonly repository: EntrepriseRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: EntrepriseAddCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentEntrepriseAddCommandException(errors);
    }

    const entreprise = new EntrepriseModel(this.uuidGenerator.generate());

    entreprise.add(command);

    return this.repository.store(entreprise).then(() => {
      this.eventBus.publish(new EntrepriseAddedEvent(entreprise));

      return entreprise.uuid;
    });
  }
}
