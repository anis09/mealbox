import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class KitchenDeleteInput {
  @Field()
  public readonly uuid: string;
}
