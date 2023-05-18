import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EntrepriseDeleteInput {
  @Field()
  public readonly uuid: string;
}
