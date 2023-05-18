import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MealDeleteInput {
  @Field()
  public readonly uuid: string;
}
