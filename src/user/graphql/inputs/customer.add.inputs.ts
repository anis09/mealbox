import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CustomerAddPhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@InputType()
export class CustomerAddInput {
  @Field()
  public readonly firstName: string;

  @Field()
  public readonly lastName: string;

  @Field()
  public readonly email: string;

  @Field()
  public readonly password: string;

  @Field()
  public readonly entreprise: string;

  @Field()
  public readonly phone: CustomerAddPhoneInput;
}
