import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DessertDeleteInput {
  @Field()
  public readonly uuid: string;
}
