import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchRequestEntrepriseByLocationArgs {
  @Field()
  zipCode: number;

  @Field()
  city: string;
}

@ArgsType()
export class SearchRequestEntrepriseByArgs {
  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  socialReason: string;

  @Field({ nullable: true })
  location?: SearchRequestEntrepriseByLocationArgs;

  @Field({ nullable: true })
  distance: number;
}
