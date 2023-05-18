import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EmployerRepository } from '../../repositories';
import { PasswordHasher } from '../../../common';
import { JwtService } from '@nestjs/jwt';
import { EmployerLoginEvent } from '../../events';
import { EmployerLoginCommand } from '../employer.login.command';
import { EmployerExceptionLogin } from '../../exceptions';

@CommandHandler(EmployerLoginCommand)
export class EmployerLoginCommandHandler
  implements ICommandHandler<EmployerLoginCommand>
{
  constructor(
    private readonly repository: EmployerRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: EmployerLoginCommand,
  ): Promise<{ accessToken: string }> {
    const employer = await this.repository.findOneByEmail(command.email);

    if (!employer) {
      throw new EmployerExceptionLogin();
    }

    const isValidPassword = await employer.verifyPassword(
      this.passwordHasher,
      command.password,
    );

    if (!isValidPassword) {
      throw new EmployerExceptionLogin();
    }

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
