import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { EmployerRepository } from '../../repositories';
import { EmployerGoogleLoginCommand } from '../employer.google.login.command';
import * as validator from 'class-validator';
import { EmployerLoginEvent } from '../../events';
import { EmployerExceptionGoogleLogin } from '../../exceptions';

@CommandHandler(EmployerGoogleLoginCommand)
export class EmployerGoogleLoginCommandHandler
  implements ICommandHandler<EmployerGoogleLoginCommand>
{
  constructor(
    private readonly repository: EmployerRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
    private readonly oAuth2Client: OAuth2Client,
  ) {}

  async execute(
    command: EmployerGoogleLoginCommand,
  ): Promise<{ accessToken: string }> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) throw new EmployerExceptionGoogleLogin();

    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: command.tokenId,
    });

    const payload = ticket.getPayload();

    if (payload.hd !== 'prima-it.consulting') {
      throw new EmployerExceptionGoogleLogin();
    }

    const employer = await this.repository.findOneByEmail(payload.email);

    return this.jwtService
      .signAsync({
        sub: employer.uuid,
        uuid: employer.uuid,
        email: employer.email,
        firstName: employer.firstName,
        lastName: employer.lastName,
      })
      .then((accessToken) => {
        this.eventBus.publish(new EmployerLoginEvent(employer));
        return { accessToken };
      });
  }
}
