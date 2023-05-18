import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}
