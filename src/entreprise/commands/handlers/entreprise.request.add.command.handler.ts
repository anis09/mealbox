import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntrepriseSendAddRequestCommand } from '../entreprise.request.add.command';
import { EntrepriseAddRequestModel } from '../../models';
import { EntrepriseRequestRepository } from '../../repositories';
import { EntrepriseSentAddRequestEvent } from '../../events';
import * as validator from 'class-validator';
import { InvalidArgumentEntrepriseSendAddRequestCommandException } from '../../exceptions';
import { UuidGenerator } from '../../../common';

@CommandHandler(EntrepriseSendAddRequestCommand)
export class EntrepriseSendAddRequestCommandHandler
  implements ICommandHandler<EntrepriseSendAddRequestCommand>
{
  constructor(
    private readonly repository: EntrepriseRequestRepository,
    private readonly eventBus: EventBus,
    private readonly uuidGenerator: UuidGenerator,
  ) {}

  async execute(command: EntrepriseSendAddRequestCommand): Promise<string> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) {
      throw new InvalidArgumentEntrepriseSendAddRequestCommandException(errors);
    }

    const entrepriseAddRequest = new EntrepriseAddRequestModel(
      this.uuidGenerator.generate(),
    );

    entrepriseAddRequest.create(command);

    return this.repository.store(entrepriseAddRequest).then(() => {
      this.eventBus.publish(
        new EntrepriseSentAddRequestEvent(entrepriseAddRequest),
      );

      return entrepriseAddRequest.uuid;
    });
  }
}
