import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GroceryAddInput {
  @Field()
  public readonly name: string;

  @Field()
  public readonly description: string;

  @Field()
  public readonly price: number;

  @Field()
  public readonly category: string;

  @Field()
  public readonly image: string;
}
