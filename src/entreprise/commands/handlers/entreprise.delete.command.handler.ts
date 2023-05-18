import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntrepriseDeleteCommand } from '../entreprise.delete.command';
import { EntrepriseRepository } from '../../repositories';
import * as validator from 'class-validator';
import { EntrepriseDeletedEvent } from '../../events';
import { CustomerExceptionDelete } from '../../../user/exceptions';

@CommandHandler(EntrepriseDeleteCommand)
export class EntrepriseDeleteCommandHandler
  implements ICommandHandler<EntrepriseDeleteCommand>
{
  constructor(
    private readonly repository: EntrepriseRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: EntrepriseDeleteCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new CustomerExceptionDelete(errors);
    }

    const entreprise = await this.repository.findOneByUuid(command.uuid);

    if (!entreprise) {
      throw new Error('not found');
    }

    return this.repository.delete(entreprise).then(() => {
      this.eventBus.publish(new EntrepriseDeletedEvent(entreprise));

      return entreprise.uuid;
    });
  }
}
