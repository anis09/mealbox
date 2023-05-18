import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CustomerLoginCommand } from '../customer.login.command';
import { CustomerRepository } from '../../repositories';
import { PasswordHasher } from '../../../common';
import { JwtService } from '@nestjs/jwt';
import { CustomerLoginException } from '../../exceptions/customer.login.exception';
import { CustomerLoginEvent } from '../../events';

@CommandHandler(CustomerLoginCommand)
export class CustomerLoginCommandHandler
  implements ICommandHandler<CustomerLoginCommand>
{
  constructor(
    private readonly repository: CustomerRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly jwtService: JwtService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: CustomerLoginCommand,
  ): Promise<{ accessToken: string }> {
    const customer = await this.repository.findOneByEmailOrPhone(
      command.emailOrPhone,
    );

    if (!customer) {
      throw new CustomerLoginException();
    }

    const isValidPassword = await customer.verifyPassword(
      this.passwordHasher,
      command.password,
    );

    if (!isValidPassword) {
      throw new CustomerLoginException();
    }

    return this.jwtService
      .signAsync({
        sub: customer.uuid,
        uuid: customer.uuid,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
      })
      .then((accessToken) => {
        this.eventBus.publish(new CustomerLoginEvent(customer));
        return { accessToken };
      });
  }
}
