import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
class SearchKitchenByLocationArgs {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@ArgsType()
export class SearchKitchenByArgs {
  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  public readonly name: string;

  @Field({ nullable: true })
  public readonly location?: SearchKitchenByLocationArgs;
}
