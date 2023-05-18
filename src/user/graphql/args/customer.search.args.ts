import { ArgsType, Field, InputType } from '@nestjs/graphql';
@InputType()
class SearchCustomerByPhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@ArgsType()
export class SearchCustomerByArgs {
  @Field({ nullable: true })
  uuid: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  entreprise?: string;

  @Field({ nullable: true })
  phone?: SearchCustomerByPhoneInput;
}
