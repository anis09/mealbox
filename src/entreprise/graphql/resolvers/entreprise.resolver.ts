import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  EntrepriseAddInput,
  EntrepriseDeleteInput,
  EntrepriseSendAddRequestInput,
  EntrepriseUpdateInput,
} from '../inputs/';
import {
  EntrepriseAddCommand,
  EntrepriseDeleteCommand,
  EntrepriseSendAddRequestCommand,
  EntrepriseUpdateCommand,
} from '../../commands';
import { Entreprise } from '../types';
import { SearchEntrepriseByArgs, SearchRequestEntrepriseByArgs } from '../args';
import {
  EntrepriseRequestSearchQuery,
  EntrepriseSearchQuery,
} from '../../queries';
import { EntrepriseRequest } from '../types/entrepriseRequest';

@Resolver()
export class EntrepriseResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  entrepriseAdd(
    @Args(EntrepriseAddInput.name) entrepriseAddInput: EntrepriseAddInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(EntrepriseAddCommand, entrepriseAddInput),
    );
  }

  @Mutation(() => String)
  entrepriseUpdate(
    @Args(EntrepriseUpdateInput.name)
    entrepriseUpdateInput: EntrepriseUpdateInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(EntrepriseUpdateCommand, entrepriseUpdateInput),
    );
  }

  @Mutation(() => String)
  entrepriseRequestAdd(
    @Args(EntrepriseSendAddRequestInput.name)
    entrepriseRequestAddInput: EntrepriseSendAddRequestInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(
        EntrepriseSendAddRequestCommand,
        entrepriseRequestAddInput,
      ),
    );
  }
  @Mutation(() => String)
  entrepriseDelete(
    @Args(EntrepriseDeleteInput.name)
    entrepriseDeleteInput: EntrepriseDeleteInput,
  ) {
    return this.commandBus.execute(
      plainToInstance(EntrepriseDeleteCommand, entrepriseDeleteInput),
    );
  }

  @Query(() => [Entreprise], { nullable: true })
  entrepriseSearch(
    @Args() searchEntrepriseByArgs: SearchEntrepriseByArgs,
  ): Promise<Entreprise[]> {
    return this.queryBus.execute(
      plainToInstance(EntrepriseSearchQuery, searchEntrepriseByArgs),
    );
  }
  @Query(() => [EntrepriseRequest], { nullable: true })
  entrepriseRequestSearch(
    @Args() searchRequestEntrepriseByArgs: SearchRequestEntrepriseByArgs,
  ): Promise<EntrepriseRequest[]> {
    return this.queryBus.execute(
      plainToInstance(
        EntrepriseRequestSearchQuery,
        searchRequestEntrepriseByArgs,
      ),
    );
  }
}
