import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchEntrepriseByLocationArgs {
  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@ArgsType()
export class SearchEntrepriseByArgs {
  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  location?: SearchEntrepriseByLocationArgs;

  @Field({ nullable: true })
  distance: number;
}
