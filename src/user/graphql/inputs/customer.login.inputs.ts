import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerLoginInput {
  @Field()
  public readonly emailOrPhone: string;

  @Field()
  public readonly password: string;
}
