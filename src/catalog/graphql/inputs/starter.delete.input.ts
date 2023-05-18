import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class StarterDeleteInput {
  @Field()
  public readonly uuid: string;
}
