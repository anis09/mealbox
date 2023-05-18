import { Field, InputType } from '@nestjs/graphql';

@InputType()
class EntrepriseUpdatePhoneInput {
  @Field()
  public readonly country: string;

  @Field()
  public readonly number: string;
}

@InputType()
class EntrepriseUpdateAddressInput {
  @Field()
  public readonly street: string;

  @Field()
  public readonly additional: string;

  @Field()
  public readonly zipCode: number;

  @Field()
  public readonly city: string;

  @Field()
  public readonly country: string;
}

@InputType()
class EntrepriseUpdateLocationInput {
  @Field()
  public readonly latitude: number;

  @Field()
  public readonly longitude: number;
}

@InputType()
export class EntrepriseUpdateInput {
  @Field()
  public readonly uuid: string;

  @Field({ nullable: true })
  public readonly name: string;

  @Field({ nullable: true })
  public readonly email: string;

  @Field({ nullable: true })
  public readonly phone: EntrepriseUpdatePhoneInput;

  @Field({ nullable: true })
  public readonly address: EntrepriseUpdateAddressInput;

  @Field({ nullable: true })
  public readonly location: EntrepriseUpdateLocationInput;

  @Field({ nullable: true })
  public readonly activate?: boolean;
}
