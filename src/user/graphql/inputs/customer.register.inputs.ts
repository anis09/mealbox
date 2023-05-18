import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CustomerRegisterPhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@InputType()
export class CustomerRegisterInput {
  @Field()
  public readonly firstName: string;

  @Field()
  public readonly lastName: string;

  @Field()
  public readonly email: string;

  @Field()
  public readonly password: string;

  @Field()
  public readonly phone: CustomerRegisterPhoneInput;
}
