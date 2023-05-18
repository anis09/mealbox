import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GroceryDeleteInput {
  @Field()
  public readonly uuid: string;
}
