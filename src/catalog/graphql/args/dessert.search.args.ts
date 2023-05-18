import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SearchDessertByArgs {
  @Field({ nullable: true })
  uuid: string;
  @Field({ nullable: true })
  public readonly name: string;
  @Field({ nullable: true })
  public readonly description: string;
  @Field({ nullable: true })
  public readonly price: number;
  @Field({ nullable: true })
  public readonly category: string;
  @Field({ nullable: true })
  public readonly image: string;
}
