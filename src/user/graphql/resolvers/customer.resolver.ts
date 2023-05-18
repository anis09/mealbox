import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  CustomerAddCommand,
  CustomerDeleteCommand,
  CustomerUpdateCommand,
  CustomerRegisterCommand,
  CustomerLoginCommand,
  CustomerGoogleLoginCommand,
} from '../../commands';
import {
  CustomerUpdateInput,
  CustomerDeleteInput,
  CustomerAddInput,
  CustomerRegisterInput,
  CustomerLoginInput,
  CustomerGoogleLoginInput,
} from '../inputs';
import { AccessToken } from '../../../common/graphql/types';
import { Customer } from '../types/customer';
import { SearchCustomerByArgs } from '../args';
import { CustomerSearchQuery } from 'src/user/queries';

@Resolver()
export class CustomerResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  customerAdd(@Args(CustomerAddInput.name) customerAddInput: CustomerAddInput) {
    return this.commandBus.execute(
      plainToInstance(CustomerAddCommand, customerAddInput),
    );
  }

  @Mutation(() => String)
  customerUpdate(
    @Args(CustomerUpdateInput.name) customerUpdateInput: CustomerUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(CustomerUpdateCommand, customerUpdateInput),
    );
  }

  @Mutation(() => String)
  customerDelete(
    @Args(CustomerDeleteInput.name) customerDeleteInput: CustomerDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(CustomerDeleteCommand, customerDeleteInput),
    );
  }

  @Mutation(() => String)
  customerRegister(
    @Args(CustomerRegisterInput.name)
    customerRegisterInput: CustomerRegisterInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(CustomerRegisterCommand, customerRegisterInput),
    );
  }

  @Mutation(() => AccessToken)
  customerLogin(
    @Args(CustomerLoginInput.name)
    customerLoginInput: CustomerLoginInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(CustomerLoginCommand, customerLoginInput),
    );
  }

  @Mutation(() => AccessToken)
  customerGoogleLogin(
    @Args(CustomerGoogleLoginInput.name)
    customerGoogleLoginInput: CustomerGoogleLoginInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(CustomerGoogleLoginCommand, customerGoogleLoginInput),
    );
  }

  @Query(() => [Customer], { nullable: true })
  customerSearch(
    @Args() searchCustomerByArgs: SearchCustomerByArgs,
  ): Promise<Customer[]> {
    return this.queryBus.execute(
      plainToInstance(CustomerSearchQuery, searchCustomerByArgs),
    );
  }
}
