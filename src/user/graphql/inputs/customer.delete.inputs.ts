import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerDeleteInput {
  @Field()
  public readonly uuid: string;
}
