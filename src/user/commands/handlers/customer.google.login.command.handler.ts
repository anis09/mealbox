import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerRepository } from '../../repositories';
import { CustomerGoogleLoginCommand } from '../customer.google.login.command';
import * as validator from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { CustomerExceptionGoogleLogin } from '../../exceptions';
import { CustomerLoginEvent } from '../../events';

@CommandHandler(CustomerGoogleLoginCommand)
export class CustomerGoogleLoginCommandHandler
  implements ICommandHandler<CustomerGoogleLoginCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
    private readonly oAuth2Client: OAuth2Client,
  ) {}

  async execute(
    command: CustomerGoogleLoginCommand,
  ): Promise<{ accessToken: string }> {
    const errors = validator.validateSync(command);

    if (errors.length !== 0) throw new CustomerExceptionGoogleLogin(errors);

    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: command.tokenId,
    });

    const customer = await this.repository.findOneByEmail(
      ticket.getPayload().email,
    );

    return this.jwtService
      .signAsync({
        sub: customer.uuid,
        uuid: customer.uuid,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        roles: ['customer'],
      })
      .then((accessToken) => {
        this.eventBus.publish(new CustomerLoginEvent(customer));
        return { accessToken };
      });
  }
}
