import { Field, InputType } from '@nestjs/graphql';

@InputType()
class CustomerUpdatePhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@InputType()
export class CustomerUpdateInput {
  @Field()
  public readonly uuid: string;

  @Field({ nullable: true })
  public readonly firstName: string;

  @Field({ nullable: true })
  public readonly lastName: string;

  @Field({ nullable: true })
  public readonly email: string;

  @Field()
  public readonly entreprise: string;

  @Field({ nullable: true })
  public readonly password: string;

  @Field(() => CustomerUpdatePhoneInput, { nullable: true })
  public readonly phone: CustomerUpdatePhoneInput;
}
