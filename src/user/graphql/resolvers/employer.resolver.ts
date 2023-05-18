import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Parent,
} from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import {
  EmployerGoogleLoginCommand,
  EmployerLoginCommand,
} from '../../commands';
import { EmployerGoogleLoginInput, EmployerLoginInput } from '../inputs';
import { AccessToken } from '../../../common/graphql/types';
import { CurrentUser } from '../../decorators';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards';
import { EmployerProfileQuery } from '../../queries';
import { Payload } from '../../strategies/jwt.strategy';
import { Employer } from '../types';

@Resolver(() => Employer)
export class EmployerResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => AccessToken)
  employerLogin(
    @Args(EmployerLoginInput.name)
    employerLoginInput: EmployerLoginInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(EmployerLoginCommand, employerLoginInput),
    );
  }

  @Mutation(() => AccessToken)
  employerGoogleLogin(
    @Args(EmployerGoogleLoginInput.name)
    employerGoogleLoginInput: EmployerGoogleLoginInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(EmployerGoogleLoginCommand, employerGoogleLoginInput),
    );
  }

  @Query(() => Employer, { nullable: true })
  @UseGuards(GqlAuthGuard)
  employerProfile(@CurrentUser() user: Payload): Promise<Employer> {
    return this.queryBus.execute(
      plainToInstance(EmployerProfileQuery, { uuid: user.id }),
    );
  }

  @ResolveField(() => String)
  fullName(@Parent() employer: Employer) {
    return `${employer.firstName} ${employer.lastName}`;
  }
}
