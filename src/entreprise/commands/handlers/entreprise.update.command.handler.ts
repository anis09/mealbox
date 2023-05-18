import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntrepriseUpdateCommand } from '../entreprise.update.command';
import { EntrepriseRepository } from '../../repositories';
import * as validator from 'class-validator';
import { InvalidArgumentEntrepriseUpdateCommandException } from '../../exceptions';
import { EntrepriseUpdatedEvent } from '../../events';

@CommandHandler(EntrepriseUpdateCommand)
export class EntrepriseUpdateCommandHandler
  implements ICommandHandler<EntrepriseUpdateCommand>
{
  constructor(
    private readonly repository: EntrepriseRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: EntrepriseUpdateCommand): Promise<any> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentEntrepriseUpdateCommandException(errors);
    }

    const entreprise = await this.repository.findOneByUuid(command.uuid);

    if (!entreprise) {
      throw new Error(`Entreprise not found with this uuid :${command.uuid}`);
    }

    entreprise.update(command);

    return this.repository.update(entreprise).then(() => {
      this.eventBus.publish(new EntrepriseUpdatedEvent(entreprise));

      return command.uuid;
    });
  }
}
